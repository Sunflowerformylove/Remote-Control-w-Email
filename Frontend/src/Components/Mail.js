import { useEffect, useState } from "react";
import "../Styles/Mail.css";
import { IonIcon } from "@ionic/react";
import * as Icon from "ionicons/icons";

export default function Mail(props) {
    const [mail, setMail] = useState("");
    const [time, setTime] = useState("");
    const [subject, setSubject] = useState("");
    const [command, setCommand] = useState("");
    const [description, setDescription] = useState("");

    function updateTime() {
        setInterval(() => {
            setTime(new Date().toLocaleString());
        }, 1000);
    }

    const commands = {
        shutdown: "shutdown",
        sleep: "sleep",
        MAC_IP: "MAC/IP",
        task: "task",
        terminal: "terminal",
        screenshot: "screenshot",
        keylogger: "keylogger",
        terminate: "terminate",
        folder: "folder tree",
        system: "system",
    }

    function setMailContent(index, command, time = 0, task_number = 0, PID = 0) {
        switch (index) {
            case 0:
                setMail(commands.shutdown);
                setSubject("[RDCVE] Shutdown");
                setCommand("Shutdown " + time);
                setDescription("Shutdown the computer immediately");
                break;
            case 1:
                setMail(commands.sleep);
                setSubject("[RDCVE] Sleep");
                setCommand("Sleep" + time);
                setDescription("Put the computer to sleep");
                break;
            case 2:
                setMail(commands.MAC_IP);
                setSubject("[RDCVE] MAC/IP");
                setCommand("MAC/IP");
                setDescription("Get the MAC and IP address of the computer");
                break;
            case 3:
                setMail(commands.task);
                setSubject("[RDCVE] Task Manager");
                setCommand("Task Manager " + task_number);
                setDescription("Get the list of running processes with ports and PIDs");
                break;
            case 4:
                setMail(commands.terminal);
                setSubject("[RDCVE] Terminal");
                setCommand("Terminal " + command);
                setDescription("Run a command in the terminal");
                break;
            case 5:
                setMail(commands.screenshot);
                setSubject("[RDCVE] Screenshot");
                setCommand("Screenshot");
                setDescription("Take a screenshot of the computer");
                break;
            case 6:
                setMail(commands.keylogger);
                setSubject("[RDCVE] Keylogger");
                setCommand("Keylogger");
                setDescription("Get the keystrokes of the computer");
                break;
            case 7:
                setMail(commands.terminate);
                setSubject("[RDCVE] Terminate");
                setCommand("Terminate " + PID);
                setDescription("Terminate the a task with the given PID");
                break;
            case 8:
                setMail(commands.folder);
                setSubject("[RDCVE] Folder Tree");
                setCommand("Folder Tree" + folderName);
                setDescription("Get the folder tree of the computer");
                break;
            case 9:
                setMail(commands.system);
                setSubject("[RDCVE] System Info");
                setCommand("System Info");
                setDescription("Get the system info of the computer");
                break;
    }

    useEffect(() => {
        updateTime();
    }, []);

    return (<>
        <div className="mailContainer">
            <div className="mail">
                <div className="mailReceiver">
                    <div className="mailReceiverText">To: </div>
                    <div className="receiverEmail">atwohohoho@gmail.com</div>
                    <div className="copyButton">Copy</div>
                </div>
                <div className="mailSender">
                    <div className="mailSenderText">From: </div>
                    <input type={"text"} className="senderEmail"></input>
                </div>
                <div className="subjectBox">
                    <div className="subjectText">Subject: </div>
                    <div className="dynamicSubject">[RDCVE] Shutdown</div>
                    <div className="copyButton">Copy</div>
                </div>
                <div className="mailContentContainer">
                    <div className="mailContent">
                        <div className="command">Command: </div>
                        <br></br>
                        <div className="date">Time sent: {time}</div>
                        <br></br>
                        <div className="briefDescription">Description: </div>
                    </div>
                </div>
                <div className="sendButton">
                    <div className="sendBtnText">Send</div>
                    <IonIcon className="sendIcon" icon={Icon.paperPlaneOutline}></IonIcon>
                </div>
            </div>
        </div>
    </>)
}