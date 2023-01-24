package killer

import (
	"os/exec"
)

func osKillProcess(processName, processID, port string) error {
	cmd := exec.Command("taskkill", "/im", processName, "/f")

	return cmd.Run()
}
