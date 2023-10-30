# Python program to take 
# screenshots 
  
import numpy as np 
import cv2 
import pyautogui 
import time
  
def take_screenshots(sec):
    time.sleep(sec)  # Wait for the specified seconds
    image = pyautogui.screenshot()  # Take the screenshot
    image = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)  # Convert to BGR
    cv2.imwrite("image1.png", image)  # Save the screenshot as "image1.png"
