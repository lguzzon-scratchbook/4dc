package tray

import (
	"context"
	"fmt"
	"time"

	"github.com/co0p/4dc/examples/pomodoro/internal/app"
)

// ManageTitleUpdates watches app state and, while a timer is running,
// periodically calls setTitle with a formatted remaining time. When idle,
// it calls clearTitle. The function returns when ctx is done.
//
// The ticker factory returns a channel of tick events and a stop function
// so callers (including tests) can provide deterministic tick sources.
func ManageTitleUpdates(ctx context.Context, a app.App, setTitle func(string), clearTitle func(),
	newTicker func(d time.Duration) (<-chan time.Time, func())) {

	stateCh := make(chan app.State, 1)
	a.OnStateChange(func(s app.State) {
		select {
		case stateCh <- s:
		default:
		}
	})

	var tickCh <-chan time.Time
	var stopTicker func()
	running := false

	for {
		select {
		case <-ctx.Done():
			if running {
				if stopTicker != nil {
					stopTicker()
				}
				clearTitle()
			}
			return
		case s := <-stateCh:
			if s == app.StatePomodoroRunning || s == app.StateBreakRunning {
				// if already running, restart ticker so we pick up new duration immediately
				if stopTicker != nil {
					stopTicker()
				}
				ch, stopper := newTicker(10 * time.Second)
				tickCh = ch
				stopTicker = stopper
				running = true
				// immediate update on any transition to running
				rem := a.Remaining()
				mins := int(rem.Minutes())
				setTitle(formatMinutes(mins))
			} else if s == app.StateIdle {
				if running {
					running = false
					if stopTicker != nil {
						stopTicker()
						stopTicker = nil
					}
					clearTitle()
				}
			}
		case <-tickCh:
			if running {
				rem := a.Remaining()
				mins := int(rem.Minutes())
				setTitle(formatMinutes(mins))
			}
		}
	}
}

func formatMinutes(m int) string {
	return fmt.Sprintf("%dm", m)
}
