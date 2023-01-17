package killer

import (
	"os/exec"
)

func osKillProcess(name string) error {
	cmd := exec.Command("taskkill", "/im", name, "/f")

	return cmd.Run()
}
