package killer

import (
	"os/exec"
)

func osKillProcess(processName, processID, port string) error {
	cmd := exec.Command("killall", "-KILL", processName)

	return cmd.Run()
}
