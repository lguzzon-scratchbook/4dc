package tray

import (
	"context"
	"testing"
	"time"

	"github.com/co0p/4dc/examples/pomodoro/internal/app"
)

type fakeApp struct {
	rem time.Duration
	cb  func(app.State)
}

func (f *fakeApp) StartPomodoro()                     {}
func (f *fakeApp) StartBreak()                        {}
func (f *fakeApp) Shutdown(ctx context.Context) error { return nil }
func (f *fakeApp) OnStateChange(fn func(app.State))   { f.cb = fn }
func (f *fakeApp) State() app.State                   { return app.StateIdle }
func (f *fakeApp) Remaining() time.Duration           { return f.rem }

func TestManageTitleUpdates(t *testing.T) {
	f := &fakeApp{rem: 5 * time.Minute}
	var titles []string
	setTitle := func(s string) { titles = append(titles, s) }
	clearTitle := func() { titles = append(titles, "CLEAR") }

	// fake ticker channel and stopper
	tickCh := make(chan time.Time)
	newTicker := func(d time.Duration) (<-chan time.Time, func()) { return tickCh, func() {} }

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	// run helper in goroutine
	go ManageTitleUpdates(ctx, f, setTitle, clearTitle, newTicker)

	// wait for OnStateChange to be wired by the helper
	wired := false
	for i := 0; i < 10; i++ {
		if f.cb != nil {
			wired = true
			break
		}
		time.Sleep(5 * time.Millisecond)
	}
	if !wired {
		t.Fatalf("OnStateChange not wired")
	}
	f.rem = 5 * time.Minute
	f.cb(app.StatePomodoroRunning)
	// initial immediate update should have occurred
	// give goroutine a moment
	time.Sleep(5 * time.Millisecond)
	if len(titles) == 0 {
		t.Fatalf("expected at least one title set, got %v", titles)
	}

	// simulate tick
	f.rem = 4 * time.Minute
	tickCh <- time.Now()
	time.Sleep(5 * time.Millisecond)
	if titles[len(titles)-1] != "4m" {
		t.Fatalf("expected last title 4m, got %v", titles[len(titles)-1])
	}

	// simulate idle
	f.cb(app.StateIdle)
	time.Sleep(5 * time.Millisecond)
	if titles[len(titles)-1] != "CLEAR" {
		t.Fatalf("expected clear title, got %v", titles[len(titles)-1])
	}
}
