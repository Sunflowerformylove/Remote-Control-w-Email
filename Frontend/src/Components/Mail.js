import { useState } from "react";
import "../Styles/Mail.css";

export default function Mail() {
    const [mail, setMail] = useState("");

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
                </div>
            </div>
        </div>
    </>)
}