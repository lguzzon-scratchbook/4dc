package assets

import (
	"bytes"
	"image"
	"image/color"
	"image/png"
)

// Icon generates a 32x32 PNG of a red circle and returns its bytes.
// This keeps the demo self-contained and allows easy color/size adjustments.
func Icon() []byte {
	const size = 32
	const radius = 12

	img := image.NewNRGBA(image.Rect(0, 0, size, size))
	// Transparent background
	for y := 0; y < size; y++ {
		for x := 0; x < size; x++ {
			img.SetNRGBA(x, y, color.NRGBA{0, 0, 0, 0})
		}
	}

	cx, cy := size/2, size/2
	rr := radius * radius
	// Draw filled red circle
	for y := 0; y < size; y++ {
		for x := 0; x < size; x++ {
			dx := x - cx
			dy := y - cy
			if dx*dx+dy*dy <= rr {
				img.SetNRGBA(x, y, color.NRGBA{R: 0xE0, G: 0x22, B: 0x2D, A: 0xFF})
			}
		}
	}

	var buf bytes.Buffer
	_ = png.Encode(&buf, img)
	return buf.Bytes()
}
