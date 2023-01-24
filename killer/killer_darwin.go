package killer

import (
	"os/exec"
)

func osKillProcess(processName, processID, port string) error {
	cmd := exec.Command("kill", "-9", processID)

	return cmd.Run()
}
