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

    function setMailContent(command) {
        switch (command) {
            case "shutdown":
                setMail("");
                break;
            case "restart":
                setMail("");
                break;
            case "lock":
                setMail("");
                break;
            case "unlock":
                setMail("");
                break;
            case "MAC":
                setMail("");
                break;
            case "IP":
                setMail("");
                break;
            default:
                setMail("");
                break;
        }
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