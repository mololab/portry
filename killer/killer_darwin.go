package killer

import (
	"os/exec"
)

func osKillProcess(name string) error {
	cmd := exec.Command("killall", "-KILL", name)

	return cmd.Run()
}
