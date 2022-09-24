// Package netstat provides primitives for getting socket information on a
// Linux based operating system.
package netstat

import (
	"bufio"
	"bytes"
	"fmt"
	"net"
	"os/exec"
	"strconv"
	"strings"
)

const (
	Established SkState = iota + 1
	Close
	CloseWait
	Listen
	Closing
)

var skStates = [...]string{
	"UNKNOWN",
	"ESTABLISHED",
	// "SYN_SENT",
	// "SYN_RECV",
	// "FIN_WAIT1",
	// "FIN_WAIT2",
	// "TIME_WAIT",
	"CLOSE",
	"CLOSE_WAIT",
	// "LAST_ACK",
	"LISTEN",
	"CLOSING",
}

type lsofEntry struct {
	command string
	pid     int
	uid     int
	typ     string
	node    string
	local   *SockAddr
	remote  *SockAddr
	state   SkState
}

func doLsofCmd(cb func(e lsofEntry)) (err error) {
	cmd := exec.Command("lsof", "-i")
	outs, err := cmd.Output()
	if err != nil {
		return
	}
	scan := bufio.NewScanner(bytes.NewReader(outs))
	scan.Scan()
	scan.Bytes()
	for scan.Scan() {
		var e lsofEntry
		// COMMAND PID USER FD TYPE DEVICE SIZE/OFF NODE NAME (LISITING/ESTABLISHED/etc.)
		cols := strings.Fields(scan.Text())
		if len(cols) < 9 {
			err = fmt.Errorf("netstat: not enough fields: %v, %v", len(cols), cols)
			return
		}
		if len(cols) < 10 {
			continue
		}
		e.command = cols[0]
		e.pid, err = strconv.Atoi(cols[1])
		if err != nil {
			return
		}
		e.uid, err = strconv.Atoi(cols[2])
		if err != nil {
			return
		}
		e.typ = cols[4]
		e.node = cols[7]
		addrs := strings.SplitN(cols[8], "->", 2)
		e.local, err = parseAddr(addrs[0])
		if err != nil {
			return
		}
		if len(addrs) >= 2 {
			e.remote, err = parseAddr(addrs[1])
			if err != nil {
				return
			}
		}
		switch cols[9] {
		case "(ESTABLISHED)":
			e.state = Established
		case "(CLOSED)":
			e.state = Close
		case "(CLOSE WAIT)":
			e.state = CloseWait
		case "(LISTEN)":
			e.state = Listen
		case "(CLOSING)":
			e.state = Closing
		}
		cb(e)
	}
	return
}

func parseAddr(str string) (addr *SockAddr, err error) {
	i := strings.LastIndexByte(str, ':')
	ip, prt := str[:i], str[i+1:]
	addr = &SockAddr{
		IP: net.ParseIP(ip),
	}
	var port int
	port, err = strconv.Atoi(prt)
	if err != nil {
		return nil, err
	}
	addr.Port = (uint16)(port)
	return
}

func osTCPSocks(accept AcceptFn) (entries []SockTabEntry, err error) {
	err = doLsofCmd(func(e lsofEntry) {
		if e.typ != "IPv4" || e.node != "TCP" {
			return
		}
		se := SockTabEntry{
			LocalAddr:  e.local,
			RemoteAddr: e.remote,
			State:      e.state,
			UID:        (uint32)(e.uid),
			Process: &Process{
				Pid:  e.pid,
				Name: e.command,
			},
		}
		if accept(&se) {
			entries = append(entries, se)
		}
	})
	if err != nil {
		return nil, err
	}
	return
}

func osTCP6Socks(accept AcceptFn) (entries []SockTabEntry, err error) {
	err = doLsofCmd(func(e lsofEntry) {
		if e.typ != "IPv6" || e.node != "TCP" {
			return
		}
		se := SockTabEntry{
			LocalAddr:  e.local,
			RemoteAddr: e.remote,
			State:      e.state,
			UID:        (uint32)(e.uid),
			Process: &Process{
				Pid:  e.pid,
				Name: e.command,
			},
		}
		if accept(&se) {
			entries = append(entries, se)
		}
	})
	if err != nil {
		return nil, err
	}
	return
}

func osUDPSocks(accept AcceptFn) (entries []SockTabEntry, err error) {
	err = doLsofCmd(func(e lsofEntry) {
		if e.typ != "IPv4" || e.node != "UDP" {
			return
		}
		se := SockTabEntry{
			LocalAddr:  e.local,
			RemoteAddr: e.remote,
			State:      e.state,
			UID:        (uint32)(e.uid),
			Process: &Process{
				Pid:  e.pid,
				Name: e.command,
			},
		}
		if accept(&se) {
			entries = append(entries, se)
		}
	})
	if err != nil {
		return nil, err
	}
	return
}

func osUDP6Socks(accept AcceptFn) (entries []SockTabEntry, err error) {
	err = doLsofCmd(func(e lsofEntry) {
		if e.typ != "IPv6" || e.node != "UDP" {
			return
		}
		se := SockTabEntry{
			LocalAddr:  e.local,
			RemoteAddr: e.remote,
			State:      e.state,
			UID:        (uint32)(e.uid),
			Process: &Process{
				Pid:  e.pid,
				Name: e.command,
			},
		}
		if accept(&se) {
			entries = append(entries, se)
		}
	})
	if err != nil {
		return nil, err
	}
	return
}
