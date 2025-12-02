package tray

import (
	"bytes"
	"image"
	"image/color"
	"image/png"
	"log"

	"github.com/getlantern/systray"
)

// SystrayAdapter shows a tray icon and menu using getlantern/systray.
type SystrayAdapter struct{}

func (a SystrayAdapter) Show(title string, items []Item) {
	systray.Run(func() {
		log.Println("[tray] systray starting")

		if title != "" {
			// Icon-only: do not set a title to avoid text in the menu bar
			systray.SetTooltip(title)
		}

		// Set a tiny generated pomodoro-style icon (16x16 red circle PNG)
		systray.SetIcon(generatePomodoroIcon())

		for _, it := range items {
			m := systray.AddMenuItem(it.Title, "")
			go func(h func()) {
				for range m.ClickedCh {
					if h != nil {
						h()
					}
				}
			}(it.OnClick)
		}

		quit := systray.AddMenuItem("Quit", "exit app")
		go func() {
			for range quit.ClickedCh {
				log.Println("[tray] quit clicked, exiting")
				systray.Quit()
			}
		}()
	}, func() {
		log.Println("[tray] systray exiting")
	})
}

// generatePomodoroIcon creates a 16x16 PNG with a red circle on transparent background.
func generatePomodoroIcon() []byte {
	const (
		w = 16
		h = 16
	)

	img := image.NewRGBA(image.Rect(0, 0, w, h))
	// Draw transparent background and a red filled circle centered at (8,8) radius ~6.5
	cx, cy := 8, 8
	r2 := 6.5 * 6.5
	red := color.RGBA{R: 220, G: 50, B: 47, A: 255}
	for y := 0; y < h; y++ {
		for x := 0; x < w; x++ {
			dx := float64(x - cx)
			dy := float64(y - cy)
			if dx*dx+dy*dy <= r2 {
				img.Set(x, y, red)
			} else {
				img.Set(x, y, color.RGBA{0, 0, 0, 0})
			}
		}
	}

	var buf bytes.Buffer
	if err := png.Encode(&buf, img); err != nil {
		log.Printf("[tray] failed to encode icon png: %v\n", err)
		return nil
	}
	return buf.Bytes()
}
