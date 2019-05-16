#!/usr/bin/env python
#
# https://www.dexterindustries.com/GoPiGo/
# https://github.com/DexterInd/GoPiGo3
#
# Copyright (c) 2017 Dexter Industries
# Released under the MIT license
# (http://choosealicense.com/licenses/mit/).
#
# For more information see
# https://github.com/DexterInd/GoPiGo3/blob/master/LICENSE.md
#
# This code is an example for controlling the GoPiGo3 motors.  This uses
# the EasyGoPiGo3 library.  You can find more information on the library
# here:  http://gopigo3.readthedocs.io/en/latest/api-basic.html#easygopigo3
#
# Results:  The GoPiGo3 will move forward for 2 seconds, and then
# backward for 2 second.


# import the time library for the sleep function
import time
# import the GoPiGo3 drivers
from easygopigo3 import EasyGoPiGo3
import os

# Create an instance of the GoPiGo3 class.
# GPG will be the GoPiGo3 object.
gpg = EasyGoPiGo3()

print("ON")

try :
    
    #Move the motors forward freely for 1 second
    gpg.forward()
    time.sleep(3)
    gpg.stop()
    
    #print("Done!")
    print("OFF")
    

except KeyboardInterrupt:
    print("OFF")
    GPG.reset_all()
    
