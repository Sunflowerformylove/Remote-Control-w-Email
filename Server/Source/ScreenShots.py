# Python program to take 
# screenshots 
  
import pyautogui 
import time
  
def take_screenshots(sec):
    time.sleep(sec)  # Wait for the specified seconds
    image = pyautogui.screenshot()  # Take the screenshot
    image.save('image1.png')
