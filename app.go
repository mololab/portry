package main

import (
	"context"
	"fmt"

	"github.com/mololab/portry/core"
	"github.com/mololab/portry/netstat"
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

func (a *App) FetchPorts() (socks []netstat.SockTabEntry) {
	socks = core.GetSocks()

	return socks
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}
