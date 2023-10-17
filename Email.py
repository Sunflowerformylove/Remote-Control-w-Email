import os
import pickle
from dotenv import load_dotenv

# Gmail API utils
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request

# Encoder and decoder
from base64 import urlsafe_b64encode, urlsafe_b64decode

# Mimetype attachment
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.image import MIMEImage
from email.mime.audio import MIMEAudio
from email.mime.base import MIMEBase
from mimetypes import guess_type as guess_mime_type

load_dotenv()

SCOPES = ['https://mail.google.com/']
EMAIL = os.getenv('EMAIL')
DIRNAME = os.path.dirname(__file__)
CLIENT_SECRET_FILE = os.path.join(DIRNAME, 'Assets\JSON', 'credential.json')
PICKLE_PATH = os.path.join(DIRNAME, 'Assets\Token', 'token.pickle')

def gmailAuthenticate():
    credentials = None
    # The file token.pickle stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    # Basically, this file is used to store the our credentials so that we
    # don't have to log in every time we want to send an email.
    if os.path.exists('token.pickle'):
        with open(PICKLE_PATH, 'rb') as token:
            credentials = pickle.load(token)
    # if no credential is found, or if the credentials are all invalid, we need to
    # log in again.
    elif not credentials or not credentials.valid:
        # if credentials are expired, we need to refresh them
        if credentials and credentials.expire and credentials.refresh_token:
            credentials.refresh(Request())
        # if no credentials are found, we need to log in
        else:
            flow = InstalledAppFlow.from_client_secrets_file(CLIENT_SECRET_FILE, SCOPES)
            credentials = flow.run_local_server()
            # Save the credentials for the next run
            with open(PICKLE_PATH, 'wb') as token:
                pickle.dump(credentials, token)
    return build('gmail', 'v1', credentials=credentials)

service = gmailAuthenticate()
