package app

import (
	"context"
	"sync"
	"time"
)

type State string

const (
	StateIdle            State = "Idle"
	StatePomodoroRunning State = "PomodoroRunning"
	StateBreakRunning    State = "BreakRunning"
)

type App interface {
	StartPomodoro()
	StartBreak()
	Shutdown(ctx context.Context) error
	OnStateChange(fn func(State))
	State() State
	Remaining() time.Duration
}

type timerApp struct {
	mu               sync.Mutex
	state            State
	cancelTimer      context.CancelFunc
	onStateChange    func(State)
	pomodoroDuration time.Duration
	breakDuration    time.Duration
	end              time.Time
}

// New creates a new App instance. Optionally pass two durations: pomodoro, break.
// Examples:
//
//	New() // uses defaults
//	New(10*time.Millisecond, 5*time.Millisecond) // test-friendly durations
func New(durations ...time.Duration) App {
	pom := 25 * time.Minute
	brk := 5 * time.Minute
	if len(durations) >= 2 {
		pom = durations[0]
		brk = durations[1]
	}
	return &timerApp{
		state:            StateIdle,
		pomodoroDuration: pom,
		breakDuration:    brk,
	}
}

func (a *timerApp) State() State {
	a.mu.Lock()
	defer a.mu.Unlock()
	return a.state
}

func (a *timerApp) OnStateChange(fn func(State)) {
	a.mu.Lock()
	a.onStateChange = fn
	a.mu.Unlock()
}

func (a *timerApp) cancelExistingTimer() {
	if a.cancelTimer != nil {
		a.cancelTimer()
		a.cancelTimer = nil
		a.end = time.Time{}
	}
}

func (a *timerApp) Remaining() time.Duration {
	a.mu.Lock()
	defer a.mu.Unlock()
	if a.state != StatePomodoroRunning && a.state != StateBreakRunning {
		return 0
	}
	if a.end.IsZero() {
		return 0
	}
	d := time.Until(a.end)
	if d <= 0 {
		return 0
	}
	return d
}

func (a *timerApp) StartPomodoro() {
	a.mu.Lock()
	if a.state == StatePomodoroRunning {
		a.mu.Unlock()
		return
	}
	a.cancelExistingTimer()
	ctx, cancel := context.WithCancel(context.Background())
	a.cancelTimer = cancel
	a.end = time.Now().Add(a.pomodoroDuration)
	a.state = StatePomodoroRunning
	cb := a.onStateChange
	a.mu.Unlock()

	if cb != nil {
		cb(StatePomodoroRunning)
	}

	go func() {
		select {
		case <-time.After(a.pomodoroDuration):
			a.mu.Lock()
			a.cancelTimer = nil
			a.state = StateIdle
			cb := a.onStateChange
			a.mu.Unlock()
			if cb != nil {
				cb(StateIdle)
			}
		case <-ctx.Done():
			return
		}
	}()
}

func (a *timerApp) StartBreak() {
	a.mu.Lock()
	if a.state == StateBreakRunning {
		a.mu.Unlock()
		return
	}
	a.cancelExistingTimer()
	ctx, cancel := context.WithCancel(context.Background())
	a.cancelTimer = cancel
	a.end = time.Now().Add(a.breakDuration)
	a.state = StateBreakRunning
	cb := a.onStateChange
	a.mu.Unlock()

	if cb != nil {
		cb(StateBreakRunning)
	}

	go func() {
		select {
		case <-time.After(a.breakDuration):
			a.mu.Lock()
			a.cancelTimer = nil
			a.state = StateIdle
			cb := a.onStateChange
			a.mu.Unlock()
			if cb != nil {
				cb(StateIdle)
			}
		case <-ctx.Done():
			return
		}
	}()
}

func (a *timerApp) Shutdown(ctx context.Context) error {
	a.mu.Lock()
	a.cancelExistingTimer()
	a.state = StateIdle
	cb := a.onStateChange
	a.mu.Unlock()
	if cb != nil {
		cb(StateIdle)
	}
	return nil
}
