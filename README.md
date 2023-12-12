# Remote Controller via Gmail

## **Introduction**

The Remote Controller via Gmail, also known as RDCVE, is a Windows application that allows user to perform pre-defined task remotely. This app runs on web browser by using ReactJS, Javascript and NodeJS for both Frontend and Backend. The Server that allow remote control is programmed with Python. Unfortunately, this app requires user to install several developing kit initially due to it is an offline application.

## Requirement

The requirement to run this application is as follow:

- Microsoft Windows Operating System 10 or 11.
- NodeJS 21.4.0.
- Python 3.12.1.

## Installation

The installation of this application could be done within these steps:

- First, clone or download the application from Github for both client and server computers: [Sunflowerformylove/Remote-Control-w-Email (github.com)](https://github.com/Sunflowerformylove/Remote-Control-w-Email). You can use this to clone the project in **cmd** or **powershell**.

  ```powershell
  cd Desktop
  git clone https://github.com/Sunflowerformylove/Remote-Control-w-Email
  ```

- Second, install the latest stable version of NodeJS on the client computer.
- Third, install the latest stable version of Python on the server computer.
- Fourth, on client computer, open **cmd** or **powershell**, run this code on 2 different tabs of terminal:

  ```powershell
  cd C:\Users\<User>\Desktop\Remote-Control-w-Email\Backend
  npm install
  ```

  ```powershell
  cd C:\Users\<User>\Desktop\Remote-Control-w-Email\Frontend
  npm install
  ```

- Fifth, on server computer, open **cmd** or **powershell**, run this code on 1 tab of terminal:

  ```powershell
  cd C:\Users\<User>\Desktop\Remote-Control-w-Email
  pip3 install -r requirement.txt
  ```

- Seventh, on client computer, run this code on both tab of terminal:

  ```powershell
  npm start
  ```

- Eighth, on server computer, run this code:

  ```powershell
    python Server\Source\Server.py
  ```

**Note: To ensure user experience and the program running as well as possible, run start the server before the backend and the frontend.

## Illustrations of application
