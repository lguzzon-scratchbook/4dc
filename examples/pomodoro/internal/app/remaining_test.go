package app

import (
	"context"
	"testing"
	"time"
)

func TestRemainingBehaviorPomodoro(t *testing.T) {
	// use short durations for test
	a := New(50*time.Millisecond, 20*time.Millisecond)

	a.StartPomodoro()
	rem := a.Remaining()
	if rem <= 0 || rem > 50*time.Millisecond {
		t.Fatalf("expected remaining in (0,50ms], got %v", rem)
	}

	time.Sleep(20 * time.Millisecond)
	rem2 := a.Remaining()
	if rem2 >= rem {
		t.Fatalf("expected remaining to decrease; before=%v after=%v", rem, rem2)
	}

	// wait for completion
	time.Sleep(40 * time.Millisecond)
	if a.Remaining() != 0 {
		t.Fatalf("expected remaining 0 after finish, got %v", a.Remaining())
	}
}

func TestRemainingAfterCancel(t *testing.T) {
	a := New(100*time.Millisecond, 50*time.Millisecond)
	a.StartPomodoro()
	if a.Remaining() == 0 {
		t.Fatalf("expected non-zero remaining after start")
	}
	// cancel via Shutdown
	_ = a.Shutdown(context.Background())
	if a.Remaining() != 0 {
		t.Fatalf("expected remaining 0 after cancel, got %v", a.Remaining())
	}
}
