#!/bin/bash

# Baud Rate disponiveis
# b1000000, b110, b115200, b1152000, b1200, b134, b150, b1500000, b1800, b19200, b200, b2000000, b230400, b2400, b2500000, b300, b3000000, b3500000, b38400, b4000000, b460800, b4800, b50, b500000, b57600, b576000, b600, b75, b921600, b9600, 
BAUD_RATE=b150

sudo socat -d -d exec:./scale-simulator.js pty,rawer,$BAUD_RATE,link=/dev/ttyScale