package core

// FilterSocks filters sockets by start and end ports
func FilterSocks(socks []Socket, startPort, endPort int) []Socket {

	filteredByPortInterval := filterByPortInterval(socks, startPort, endPort)

	filteredBySameSocks := filterBySameSocks(filteredByPortInterval)

	return filteredBySameSocks
}

// filterByPortInterval filters by port interval that provided by UI
func filterByPortInterval(socks []Socket, startPort, endPort int) []Socket {
	if startPort > endPort {
		return []Socket{}
	}

	var filteredSocks []Socket = []Socket{}

	for _, sock := range socks {
		if startPort <= int(sock.Port) && int(sock.Port) <= endPort {
			filteredSocks = append(filteredSocks, sock)
		}
	}

	return filteredSocks
}

// filterBySameSocks prevents to have 2 same sockets
func filterBySameSocks(socks []Socket) []Socket {
	var filteredSocks []Socket = []Socket{}

	for i := range socks {

		if i == 0 {
			filteredSocks = append(filteredSocks, socks[i])
			continue
		} else if i == 1 { // check with 1 back
			if !isSameData(socks[i-1], socks[i]) {
				filteredSocks = append(filteredSocks, socks[i])
			}
		} else { // check with 1 back and 2 back
			if !isSameData(socks[i-1], socks[i]) && !isSameData(socks[i-2], socks[i]) {
				filteredSocks = append(filteredSocks, socks[i])
			}
		}
	}

	return filteredSocks
}

// isSameData checks 2 socket data is same or not
func isSameData(sock1, sock2 Socket) bool {
	if sock1.Port != sock2.Port ||
		sock1.ProcessID != sock2.ProcessID ||
		sock1.ProcessName != sock2.ProcessName ||
		sock1.SocketType != sock2.SocketType {
		return false
	}

	return true
}
