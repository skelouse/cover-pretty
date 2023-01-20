package example

import "testing"

func TestFunc(t *testing.T) {
	if Function(true) != false {
		t.Error("expected false")
	}
}
