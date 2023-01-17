package killer

// KillProcess kills process with process name
func KillProcess(processName string) bool {
	if err := osKillProcess(processName); err != nil {
		return false
	}

	return true
}
