import { useEffect, useState, useRef } from "react";
import "../Styles/Mail.css";
import { IonIcon } from "@ionic/react";
import * as Icon from "ionicons/icons";
import { toastError, toastSuccess } from "./Toast";
import axios from "axios";
const lodash = require("lodash");

export default function Mail(props) {
    const [time, setTime] = useState("");
    const [subject, setSubject] = useState("");
    const [command, setCommand] = useState("");
    const [mailCommand, setMailCommand] = useState("");
    const [description, setDescription] = useState("");
    const [form, setForm] = useState({});
    const [PID, setPID] = useState(0);
    const [folderName, setFolderName] = useState("");
    const [task_number, setTask_number] = useState(0);
    const [second, setSecond] = useState(0);
    const [termCommand, setTermCommand] = useState("");
    const [cmdArg, setCmdArg] = useState("");
    const cmdArgRef = useRef(null);
    const copyContentRef = [useRef(null), useRef(null), useRef(null)];
    const descriptionArr = [
        "Turn off the computer after the given time in seconds",
        "Put the computer into a dormant state after the given time in seconds",
        "Get the MAC and IP address of the computer. 0 for All, 1 for MAC, 2 for IPv4, 3 for IPv6",
        "Get the list of running processes with ports and PIDs. 0 for all, 1 for running, 2 for not responding, 3 for RAM, 4 for CPU",
        "Run a command in the terminal, e.g. 'dir' or 'ls'",
        "Take a screenshot of the computer after the given time in seconds",
        "Get the keystrokes of the computer during the given time in seconds",
        "Terminate a task with the given PID",
        "Get the folder tree of the computer. The computer username is: Seapeas. e.g. C:/Users/Seapeas/Desktop",
        "Get the system info of the computer",
    ]
    function updateTime() {
        setInterval(() => {
            setTime(new Date().toLocaleString());
        }, 1000);
    }

    async function copyContent(index) {
        await navigator.clipboard.writeText(copyContentRef[index].current.innerText);
        toastSuccess("Copied to clipboard");
    }

    function setMailContent(index, command, time = 0, task_number = 0, PID = 0, folderName = "C:/Users/Seapeas/Desktop") {
        setDescription(descriptionArr[index]);
        switch (index) {
            case 0:
                setSubject("[RDCVE] Shutdown");
                setCommand("Shutdown " + time);
                setMailCommand("Shutdown");
                break;
            case 1:
                setSubject("[RDCVE] Sleep");
                setCommand("Sleep " + time);
                setMailCommand("Sleep");
                break;
            case 2:
                setSubject("[RDCVE] MAC/IP");
                setCommand("MAC/IP");
                setMailCommand("MAC/IP");
                break;
            case 3:
                setSubject("[RDCVE] Task Manager");
                setCommand("Task Manager " + task_number); // 0 for all, 1 for running, 2 for not responding, 3 for RAM, 4 for CPU
                setMailCommand("Task Manager");
                break;
            case 4:
                setSubject("[RDCVE] Terminal");
                setCommand("Terminal ", command);
                setMailCommand("Terminal");
                break;
            case 5:
                setSubject("[RDCVE] Screenshot");
                setCommand("Screenshot");
                setMailCommand("Screenshot");
                break;
            case 6:
                setSubject("[RDCVE] Keylogger");
                setCommand("Keylogger");
                setMailCommand("Keylogger");
                break;
            case 7:
                setSubject("[RDCVE] Terminate");
                setCommand("Terminate " + PID);
                setMailCommand("Terminate");
                break;
            case 8:
                setSubject("[RDCVE] Folder Tree");
                setCommand("Folder Tree " + folderName);
                setMailCommand("Folder Tree");
                break;
            case 9:
                setSubject("[RDCVE] System Info");
                setCommand("System Info");
                setMailCommand("System Info");
                break;
            default:
                toastError("Error: Invalid command")
                break;
        }
    }

    function setCmdArgContent() {
        setCmdArg(cmdArgRef.current.value);
    }

    function sendEmail() {
        if(cmdArg.length === 0 || cmdArgRef.current.value.length === 0) {
            toastError("Error: Command argument is required");
            return;
        }
        form.subject = subject;
        form.command = mailCommand;
        form.cmdArg = cmdArg;
        setForm(form);
        axios.post("http://localhost:3001/api/sendMail", form, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            toastSuccess("Email sent successfully");
        }).catch((err) => {
            toastError("Error: Email has not been sent");
        })
    }

    function checkCmdArg(index) {
        if (cmdArg.length === 0 || cmdArgRef.current.value.length === 0) {
            setCmdArg("0");
            cmdArgRef.current.value = "0";
            return;
        }
        switch (index) {
            case 0:
                if (!isFinite(cmdArg)) {
                    toastError("Error: Invalid time");
                    return false;
                }
                setSecond(parseInt(cmdArg));
                return true;
            case 1:
                if (!isFinite(cmdArg)) {
                    toastError("Error: Invalid time");
                    return false;
                }
                setSecond(parseInt(cmdArg));
                return true;
            case 2:
                if (!isFinite(cmdArg) || cmdArg > 4 || cmdArg < 0) {
                    toastError("Error: Invalid task number");
                    return false;
                }
                setTask_number(cmdArg);
                return true;
            case 3:
                if (!lodash.isString(cmdArg)) {
                    toastError("Error: Invalid command");
                    return false;
                }
                setTermCommand(cmdArg);
                return true;
            case 4:
                if (!lodash.isString(cmdArg)) {
                    toastError("Error: Invalid command");
                    return false;
                }
                return true;
            case 5:
                if (!isFinite(cmdArg) || cmdArg < 0) {
                    toastError("Error: Invalid PID");
                    return false;
                }
                setPID(cmdArg);
                return true;
            case 6:
                if (cmdArg.length !== 0) {
                    toastError("Error: Invalid time");
                    return false;
                }
                return true;
            case 7:
                if (!isFinite(cmdArg) || cmdArg < 0) {
                    toastError("Error: Invalid PID");
                    return false;
                }
                setPID(cmdArg);
                return true;
            case 8:
                const REGEXP = '^[a-zA-Z]:(?:\\{2}|\/).*|\/(?:[^\/\0]+\/)*[^\/\0]+\/?$';
                const test = new RegExp(REGEXP);
                if (!test.test(cmdArg)) {
                    toastError("Error: Invalid folder path");
                    return false;
                }
                setFolderName(cmdArg);
                return true;
            case 9:
                return true;
            default:
                break;
        }
    }

    useEffect(() => {
        checkCmdArg(props.chosenFunctionality);
        setMailContent(props.chosenFunctionality, command, second, task_number, PID, folderName);
    }, [props.chosenFunctionality, command, second, task_number, PID, folderName]);

    useEffect(() => {
        updateTime();
    }, []);

    useEffect(() => {
        if (Number.isNaN(second)) {
            setSecond(0);
        }
        else if (Number.isNaN(task_number)) {
            setTask_number(0);
        }
        else if (Number.isNaN(PID)) {
            setPID(0);
        }
    }, [second, task_number, PID]);

    return (<>
        <div className="mailContainer">
            <div className="mail">
                <div className="mailReceiver">
                    <div className="mailReceiverText">To: </div>
                    <div className="receiverEmail" ref={copyContentRef[0]}>atwohohoho@gmail.com</div>
                    <div className="copyButton" onClick={async () => await copyContent(0)}>Copy</div>
                </div>
                <div className="subjectBox">
                    <div className="subjectText">Subject: </div>
                    <div className="dynamicSubject" ref={copyContentRef[1]}>{subject}</div>
                    <div className="copyButton" onClick={async () => await copyContent(1)}>Copy</div>
                </div>
                <div className="mailContentContainer">
                    <div className="mailContent" ref={copyContentRef[2]}>
                        <div className="command">Command: {command} {cmdArg} </div>
                        <br></br>
                        <div className="commandArgument">
                            <div className="commandArText">Command argument:</div>
                            <input onBlur={() => checkCmdArg(props.chosenFunctionality)}
                                onChange={setCmdArgContent}
                                ref={cmdArgRef} type="text" className="commandArInput" />
                        </div>
                        <br></br>
                        <div className="date">Time sent: {time}</div>
                        <br></br>
                        <div className="briefDescription">Description: {description}</div>
                    </div>
                    <div className="copyButton" onClick={async () => await copyContent(2)}>Copy</div>
                </div>
                <div onClick={sendEmail} className="sendButton">
                    <div className="sendBtnText">Send</div>
                    <IonIcon className="sendIcon" icon={Icon.paperPlaneOutline}></IonIcon>
                </div>
            </div>
        </div>
    </>)
}