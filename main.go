package main

import (
	"embed"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/mac"
)

//go:embed frontend/dist
var assets embed.FS

//go:embed build/appicon.png
var icon []byte

func main() {
	initializeApp()
}

func initializeApp() {
	// Create an instance of the app structure
	app := NewApp()

	// Create application with options
	err := wails.Run(&options.App{
		Title:            "portry",
		Width:            1050,
		Height:           730,
		Assets:           assets,
		BackgroundColour: &options.RGBA{R: 105, G: 123, B: 255, A: 1},
		OnStartup:        app.startup,
		OnShutdown:       app.shutdown,
		AlwaysOnTop:      false,
		Bind: []interface{}{
			app,
		},

		// MAC
		Mac: &mac.Options{
			TitleBar: &mac.TitleBar{
				TitlebarAppearsTransparent: false,
				HideTitle:                  false,
				HideTitleBar:               false,
				FullSizeContent:            false,
				UseToolbar:                 false,
				HideToolbarSeparator:       true,
			},
			WebviewIsTransparent: true,
			WindowIsTranslucent:  true,
			About: &mac.AboutInfo{
				Title:   "portry",
				Message: "scan your ports like a boss\n © 2023",
				Icon:    icon,
			},
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
