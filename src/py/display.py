#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sys
import serial
import time

if __name__ == "__main__":
    try:
	#print(sys.argv[1])
        #print("start")
        ser = serial.Serial('/dev/ttyS0', 115200, timeout=60)
        
        bmp = open(sys.argv[1], 'rb')
        dat = bmp.read()
        ser.write(dat)
        line = ser.readline()
        #print(line)
        
        ser.close()
        
        #print("end")
    except:
        import traceback
        traceback.print_exc()

