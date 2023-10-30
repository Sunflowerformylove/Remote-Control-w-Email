import { useEffect, useState, useRef } from "react";
import "../Styles/Mail.css";
import { IonIcon } from "@ionic/react";
import * as Icon from "ionicons/icons";
import { toastError, toastSuccess } from "./Toast";
import axios from "axios";
const lodash = require("lodash");

export default function Mail(props) {
    const [mail, setMail] = useState("");
    const [time, setTime] = useState("");
    const [subject, setSubject] = useState("");
    const [command, setCommand] = useState("");
    const [mailCommand, setMailCommand] = useState("");
    const [description, setDescription] = useState("");
    const [password, setPassword] = useState("");
    const [form, setForm] = useState({});
    const [PID, setPID] = useState(0);
    const [folderName, setFolderName] = useState("");
    const [task_number, setTask_number] = useState(0);
    const [second, setSecond] = useState(0);
    const [termCommand, setTermCommand] = useState("");
    const [eye, setEye] = useState(Icon.eyeOff);
    const [cmdArg, setCmdArg] = useState("");
    const passwordRef = useRef(null);
    const eyeRef = useRef(null);
    const mailRef = useRef(null);
    const cmdArgRef = useRef(null);
    const sendRef = useRef(null);

    function updateTime() {
        setInterval(() => {
            setTime(new Date().toLocaleString());
        }, 1000);
    }

    function setMailContent(index, command, time = 0, task_number = 0, PID = 0, folderName = "C:/Users/dodin/Desktop") {
        switch (index) {
            case 0:
                setSubject("[RDCVE] Shutdown");
                setCommand("Shutdown " + time);
                setMailCommand("Shutdown");
                setDescription("Shutdown the computer after the given time in seconds");
                break;
            case 1:
                setSubject("[RDCVE] Sleep");
                setCommand("Sleep " + time);
                setMailCommand("Sleep");
                setDescription("Put the computer to sleep after the given time in seconds");
                break;
            case 2:
                setSubject("[RDCVE] MAC/IP");
                setCommand("MAC/IP");
                setMailCommand("MAC/IP");
                setDescription("Get the MAC and IP address of the computer");
                break;
            case 3:
                setSubject("[RDCVE] Task Manager");
                setCommand("Task Manager " + task_number); // 0 for all, 1 for running, 2 for not responding, 3 for RAM, 4 for CPU
                setMailCommand("Task Manager");
                setDescription("Get the list of running processes with ports and PIDs");
                break;
            case 4:
                setSubject("[RDCVE] Terminal");
                setCommand("Terminal ", command);
                setMailCommand("Terminal");
                setDescription("Run a command in the terminal");
                break;
            case 5:
                ;
                setSubject("[RDCVE] Screenshot");
                setCommand("Screenshot");
                setMailCommand("Screenshot");
                setDescription("Take a screenshot of the computer");
                break;
            case 6:
                setSubject("[RDCVE] Keylogger");
                setCommand("Keylogger");
                setMailCommand("Keylogger");
                setDescription("Get the keystrokes of the computer");
                break;
            case 7:
                setSubject("[RDCVE] Terminate");
                setCommand("Terminate " + PID);
                setMailCommand("Terminate");
                setDescription("Terminate the a task with the given PID");
                break;
            case 8:
                setSubject("[RDCVE] Folder Tree");
                setCommand("Folder Tree " + folderName);
                setMailCommand("Folder Tree");
                setDescription("Get the folder tree of the computer. The computer username is: dodin");
                break;
            case 9:
                setSubject("[RDCVE] System Info");
                setCommand("System Info");
                setMailCommand("System Info");
                setDescription("Get the system info of the computer.");
                break;
            default:
                toastError("Error: Invalid command")
                break;
        }
    }

    function passwordVisibility() {
        passwordRef.current.type = passwordRef.current.type === "password" ? "text" : "password";
        setEye(eye === Icon.eyeOff ? Icon.eye : Icon.eyeOff);
    }

    function setFormContent() {
        setMail(mailRef.current.value);
        setPassword(passwordRef.current.value);
    }

    function setCmdArgContent() {
        setCmdArg(cmdArgRef.current.value);
    }

    function sendEmail() {
        console.log(mail);
        console.log(password);
        if (password.length === 0 || mail.length === 0) {
            toastError("Error: Email or password is empty");
            return;
        }
        form.sender = mail;
        form.password = password;
        form.subject = subject;
        form.command = command;
        form.cmdArg = cmdArg;
        setForm(form);
        axios.post("http://localhost:3001/api/sendMail", form, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            toastSuccess("Email sent successfully");
        }).catch((err) => {
            console.log(err);
            toastError("Error: Email has not been sent");
        })
    }

    function checkCmdArg(index) {
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
                    toastError("Error: Command argument is not needed");
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
                    toastError("Error: Command argument is not needed");
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
                if (cmdArg.length !== 0) {
                    toastError("Error: Command argument is not needed");
                    return false;
                }
                return true;
            default:
                break;
        }
    }

    useEffect(() => {
    }, [props.chosenFunctionality])

    useEffect(() => {
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
                    <div className="receiverEmail">atwohohoho@gmail.com</div>
                    <div className="copyButton">Copy</div>
                </div>
                <div className="mailSender">
                    <div onInput={setFormContent} className="mailSenderText">From: </div>
                    <input ref={mailRef} type={"text"} className="senderEmail"></input>
                </div>
                <div className="senderPassword">
                    <div className="senderPasswordText">Password: </div>
                    <input onInput={setFormContent} ref={passwordRef} type={"password"} className="senderPasswordInput"></input>
                    <IonIcon ref={eyeRef} onClick={passwordVisibility} icon={eye} className={"passwordState"}></IonIcon>
                </div>
                <div className="subjectBox">
                    <div className="subjectText">Subject: </div>
                    <div className="dynamicSubject">{subject}</div>
                    <div className="copyButton">Copy</div>
                </div>
                <div className="mailContentContainer">
                    <div className="mailContent">
                        <div className="command">Command: {command} </div>
                        <br></br>
                        <div className="commandArgument">
                            <div className="commandArText">Command argument:</div>
                            <input onBlur={() => checkCmdArg(props.chosenFunctionality)} onInput={setCmdArgContent} ref={cmdArgRef} type="text" className="commandArInput" />
                        </div>
                        <br></br>
                        <div className="date">Time sent: {time}</div>
                        <br></br>
                        <div className="briefDescription">Description: </div>
                    </div>
                </div>
                <div onClick = {sendEmail} className="sendButton">
                    <div className="sendBtnText">Send</div>
                    <IonIcon className="sendIcon" icon={Icon.paperPlaneOutline}></IonIcon>
                </div>
            </div>
        </div>
    </>)
}