from __future__ import print_function

import time
import base64
import os.path
import Pc
import ScreenShots
import MAC_IP

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# If modifying these scopes, delete the file token.json.
SCOPES = ['https://mail.google.com/']

creds = None
service = None

def buildService():
    """Shows basic usage of the Gmail API.
    Lists the user's Gmail labels.
    """
    global creds
    global service
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('../../token.json'):
        creds = Credentials.from_authorized_user_file('../../token.json', SCOPES)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'Server\\Assets\\JSON\\credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('../../token.json', 'w') as token:
            token.write(creds.to_json())
    service = build('gmail', 'v1', credentials=creds)

#def sendReport():
def checkRequirement(lines):
    if "[RDCVE]" in lines[0]:
        command_execute = lines[1].strip() if len(lines) >= 3 else None
        command_argument = lines[2].strip() if len(lines) >= 4 else None
        if command_execute and command_argument:
            if command_execute == "Shutdown":
                Pc.shutdown(int(command_argument))
            elif command_execute == "Restart":
                Pc.restart(int(command_argument))
            elif command_execute == "Sleep":
                Pc.sleep(int(command_argument))
            elif command_execute == "Screenshot":
                ScreenShots.take_screenshots(int(command_argument))
            elif command_execute == "MAC/IP":
                if command_argument == '0':
                    mac_address = MAC_IP.get_mac_address()
                    ipv4, ipv6 = MAC_IP.get_ip_addresses()
                    print(f"MAC Address: {mac_address}")
                    print(f"IPv4 Address: {ipv4}")
                    print(f"IPv6 Address: {ipv6}")
                elif command_argument == '1':
                    mac_address = MAC_IP.get_mac_address()
                    print(f"MAC Address: {mac_address}")
                elif command_argument == '2':
                    ipv4, ipv6 = MAC_IP.get_ip_addresses()
                    print(f"IPv4 Address: {ipv4}")
                elif command_argument == '3':
                    ipv4, ipv6 = MAC_IP.get_ip_addresses()
                    print(f"IPv6 Address: {ipv6}")
            

def main():
    global creds
    global service
    buildService()
    while True:
        try:
            # Call the Gmail API
            results = service.users().messages().list(userId='me', labelIds=['INBOX', 'UNREAD']).execute()
            messages = results.get('messages', [])
            if not messages:
                print('No new messages.')
            else:
                message_count = 0
                for message in messages:
                    msg = service.users().messages().get(userId='me', id=message['id']).execute()
                    email_data = msg['payload']['headers']
                    for values in email_data:
                        name = values['name']
                        if name == 'From':
                            print(f"From: {values['value']}") #print the sender address
                            from_name = values['value']
                    for part in msg['payload']['parts']:
                        try:
                            data = part['body']["data"]
                            byte_code = base64.urlsafe_b64decode(data)
                            text = byte_code.decode("utf-8")
                            if message_count == 0:  # Print the first message only
                                print("This is the message: ")
                                print(str(text))
                                                        # Parsing the message to extract command_execute and command_argument
                                lines = text.split('\n')
                                message_count += 1
                                checkRequirement(lines)

                            # mark the message as read (optional)
                            msg = service.users().messages().modify(userId='me', id=message['id'], body={'removeLabelIds': ['UNREAD']}).execute()
                        except BaseException as error:
                            pass
        except Exception as error:
            print(f'An error occurred: {error}')
        time.sleep(10)

if __name__ == '__main__':
    main()