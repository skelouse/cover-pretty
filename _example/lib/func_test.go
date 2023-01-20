package example

import "testing"

func TestFunc(t *testing.T) {
	if LibFunction(true) != false {
		t.Error("expected false")
	}
}
