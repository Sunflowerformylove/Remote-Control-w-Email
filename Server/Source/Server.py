from __future__ import print_function
from email.message import EmailMessage

import google.auth
import time
import base64
import os.path
import PC
import ScreenShots
import MAC_IP
import SystemInfo
import TaskManager
import CommandLine
import Folder
import Keylogger
import re
import Connect

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email.mime.text import MIMEText
from email import encoders

from email.message import EmailMessage
from email.mime.audio import MIMEAudio
from email.mime.base import MIMEBase
from email.mime.image import MIMEImage
from email.mime.text import MIMEText

# If modifying these scopes, delete the file token.json.
SCOPES = ['https://mail.google.com/']

creds = None
service = None
reportPath = None

def buildService():
    """Shows basic usage of the Gmail API.
    Lists the user's Gmail labels.
    """
    # time.sleep(600)
    global creds
    global service
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists(os.getcwd().replace('\\', '/') + '/Server/Assets/Token/token.json'):
        creds = Credentials.from_authorized_user_file(
            os.getcwd().replace('\\', '/') + '/Server/Assets/Token/token.json', SCOPES)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                os.getcwd().replace('\\', '/') + '/Server/Assets/JSON/credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open(os.getcwd().replace('\\', '/') + '/Server/Assets/Token/token.json', 'w') as token:
            token.write(creds.to_json())
    service = build('gmail', 'v1', credentials=creds)


def checkRequirement(lines):
    global command_execute
    if "[RDCVE]" in lines[0]:
        command_execute = lines[1].strip() if len(lines) >= 3 else None
        command_argument = lines[2].strip() if len(lines) >= 0 else None
        report = None
        if command_execute and command_argument:
            if command_execute == "Shutdown":
                report = f"Shut down in {command_argument} seconds."
                PC.shutdown(int(command_argument))
            elif command_execute == "Restart":
                report = f"Restart in {command_argument} seconds."
                PC.restart(int(command_argument))
            elif command_execute == "Sleep":
                report = f"Sleep in {command_argument} seconds."
                PC.sleep(int(command_argument))
            elif command_execute == "Screenshot":
                report = ScreenShots.take_screenshots(int(command_argument))
            elif command_execute == "MAC/IP":
                if command_argument == '0':
                    # all
                    mac_address = MAC_IP.get_mac_address()
                    ipv4, ipv6 = MAC_IP.get_ip_addresses()
                    report = f"MAC Address: {mac_address}\nIPv4 Address: {
                        ipv4}\nIPv6 Address: {ipv6}"
                elif command_argument == '1':
                    # mac address
                    mac_address = MAC_IP.get_mac_address()
                    report = f"MAC Address: {mac_address}"
                elif command_argument == '2':
                    # get ipv4
                    ipv4, ipv6 = MAC_IP.get_ip_addresses()
                    report = f"IPv4 Address: {ipv4}"
                elif command_argument == '3':
                    # get ipv6
                    ipv4, ipv6 = MAC_IP.get_ip_addresses()
                    report = f"IPv6 Address: {ipv6}"
            elif command_execute == "Task Manager":
                if command_argument == "0":
                    # all
                    allProcess = TaskManager.get_processes_list()
                    allApp = TaskManager.get_running_apps()
                    report = f"All Processes: \n{
                        allProcess}\n--------------------------------------------\nAll Running Application:\n{allApp}"
                elif command_argument == "1":
                    # process with status
                    statusProcesses = TaskManager.get_processes_with_status()
                    report = f"Processes with status: \n{statusProcesses}"
                elif command_argument == "2":
                    # CPU & RAM
                    memProcesses = TaskManager.get_sorted_processes()
                    report = f"Processes with memory consumption: \n{
                        memProcesses}"
            elif command_execute == "System Info":
                sysif = SystemInfo.getSystemInfo()
                # print(f"System Information: {sysif}")
                report = f"System Information: \n{sysif}"
            elif command_execute == "Terminal":
                cmd = CommandLine.runShellCommand(command_argument)
                report = f"Terminal: {cmd}"
            elif command_execute == "Terminate":
                id = TaskManager.terminate_process(command_argument)
                report = f"Terminate: {id}"
            elif command_execute == "Folder Tree":
                foldertree = Folder.getFolderTree(command_argument)
                report = f"Folder tree: {foldertree}"
            elif command_execute == "Keylogger":
                keylogger = Keylogger.get_key_log(command_argument)
                report = f"Keylogger: {keylogger}"
            elif command_execute == "System Info":
                sysif = SystemInfo.getSystemInfo()
                report = f"System Information: \n{sysif}"
            print(report)
            if command_execute != "Screenshot":
                try:
                    with open("report.txt", 'w') as file:
                        file.write(report)
                        print(f"Report has been saved to report.txt")
                except Exception as e:
                    print(f"Error writing to file: {e}")
            print(f"-------------------------\nFinish get information.")


def sendReport(email_sender):
    message = MIMEMultipart()
    message['to'] = email_sender
    message['subject'] = '[RDCVE] - Report'

    body = 'Requirement has been recorded.\nPlease check the attached file for more details.'
    message.attach(MIMEText(body, 'plain'))

    try:
        if command_execute != "Screenshot":
            with open('report.txt', 'r') as file:
                attachment = MIMEBase('application', 'octet-stream')
                attachment.set_payload(file.read())
                encoders.encode_base64(attachment)
                attachment.add_header(
                    'Content-Disposition', 'attachment', filename='report.txt')
                message.attach(attachment)
        else:
            with open('report.png', 'rb') as file:
                attachment = MIMEBase('application', 'octet-stream')
                attachment.set_payload(file.read())
                encoders.encode_base64(attachment)
                attachment.add_header(
                    'Content-Disposition', 'attachment', filename='report.png')
                message.attach(attachment)
    except Exception as e:
        print(f"Error attaching file: {e}")
        return

    raw_message = base64.urlsafe_b64encode(message.as_bytes()).decode('utf-8')
    try:
        message = service.users().messages().send(
            userId='me', body={'raw': raw_message}).execute()
        print('Report sent successfully!')
    except HttpError as error:
        print(f'An error occurred while sending the report: {error}')


def main():
    global creds
    global service
    Connect.start_socketio()
    print("Start build service...")
    buildService()
    while True:
        print("Start checking email...")
        try:
            # Call the Gmail API
            results = service.users().messages().list(
                userId='me', labelIds=['INBOX', 'UNREAD']).execute()
            messages = results.get('messages', [])
            if not messages:
                print('No new messages.')
            else:
                message_count = 0
                for message in messages:
                    msg = service.users().messages().get(
                        userId='me', id=message['id']).execute()
                    email_data = msg['payload']['headers']
                    for values in email_data:
                        name = values['name']
                        if name == 'From':
                            # print the sender address
                            print(f"From: {values['value']}")
                            if (re.search(r'<([^>]+)>', values['value'])):
                                email_sender = re.search(
                                    r'<([^>]+)>', values['value']).group(1)
                            else:
                                email_sender = values['value']
                    if msg['payload'].get('parts', -1) == -1:
                        try:
                            data = msg['payload']['body']['data']
                            byte_code = base64.urlsafe_b64decode(data)
                            text = byte_code.decode("utf-8")
                            # if message_count == 0:  # Print the first message only
                            print("This is the message: ")
                            print(str(text))
                            # Parsing the message to extract command_execute and command_argument
                            lines = text.splitlines()
                            print(lines)
                            # message_count += 1
                            checkRequirement(lines)
                            sendReport(email_sender)
                        except BaseException as error:
                            print(
                                f"Error handling plain text message: {error}")
                    else:
                        for part in msg['payload']['parts']:
                            try:
                                data = part['body']["data"]
                                byte_code = base64.urlsafe_b64decode(data)
                                text = byte_code.decode("utf-8")
                                if message_count == 0:  # Print the first message only
                                    print("This is the message: ")
                                    print(str(text))
                                    # Parsing the message to extract command_execute and command_argument
                                    lines = text.splitlines()
                                    message_count += 1
                                    checkRequirement(lines)
                                    sendReport(email_sender)
                            except BaseException as error:
                                print(
                                    f"Error handling plain text message: {error}")
                    # mark the message as read (optional)
                    msg = service.users().messages().modify(userId='me', id=message['id'], body={
                        'removeLabelIds': ['UNREAD']}).execute()
        except Exception as error:
            print(f'An error occurred: {error}')
        time.sleep(10)


if __name__ == '__main__':
    main()
