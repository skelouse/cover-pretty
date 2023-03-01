package example

import "testing"

func TestFunc(t *testing.T) {
	if LibInnerFunction(true) != false {
		t.Error("expected false")
	}
}
