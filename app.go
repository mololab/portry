package main

import (
	"context"
	"fmt"

	"github.com/mololab/portry/core"
	"github.com/mololab/portry/killer"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx

	fmt.Println("Startup")
}

func (a *App) shutdown(ctx context.Context) {
	fmt.Println("Shutdown")
}

// FetchPorts fetch ports for specific OS that app running in
func (a *App) FetchPorts(startPort, endPort int) []core.Socket {
	socks := core.GetSocks()

	formatted := core.Format(socks)

	filteredSocks := core.FilterSocks(formatted, startPort, endPort)

	return filteredSocks
}

// KillProcess kills process with process name for specific OS that app running in
func (a *App) KillProcess(processName, processID, port string) bool {
	return killer.KillProcess(processName, processID, port)
}
