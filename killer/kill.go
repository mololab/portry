package killer

// KillProcess kills process with process name OR process ID or port number
func KillProcess(processName, processID, port string) bool {
	if err := osKillProcess(processName, processID, port); err != nil {
		return false
	}

	return true
}
