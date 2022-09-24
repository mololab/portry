package main

import (
	"embed"

	"github.com/mololab/portry/core"
)

//go:embed frontend/dist
var assets embed.FS

func main() {

	core.GetSocks()

}

/*
func initializeApp() {
	// Create an instance of the app structure
	app := NewApp()

	// Create application with options
	err := wails.Run(&options.App{
		Title:            "portry",
		Width:            1050,
		Height:           730,
		Assets:           assets,
		BackgroundColour: &options.RGBA{R: 255, G: 255, B: 255, A: 1},
		OnStartup:        app.startup,
		OnShutdown:       app.shutdown,
		AlwaysOnTop:      true,
		Bind: []interface{}{
			app,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
*/
