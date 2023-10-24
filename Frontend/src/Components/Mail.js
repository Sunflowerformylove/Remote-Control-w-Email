import { useState } from "react";
import "../Styles/Mail.css";
import { IonIcon } from "@ionic/react";
import * as Icon from "ionicons/icons";

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
                    <div className="copyButton">Copy</div>
                </div>
                <div className="mailContentContainer">
                    <div className="mailContent">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris laoreet magna in odio consectetur laoreet id at nibh. Nulla tincidunt consectetur leo at posuere. In vel ultricies erat. Mauris posuere suscipit justo. Sed vitae quam turpis. Curabitur vel ligula mattis, scelerisque diam ut, sodales dolor. Pellentesque lobortis, velit id malesuada finibus, risus turpis faucibus erat, a venenatis ex sapien at ex.

                        Vestibulum vel neque vitae urna tincidunt blandit. Sed vel pulvinar mauris. Pellentesque mollis mi est, vitae facilisis nunc iaculis quis. Suspendisse euismod eget elit nec egestas. Donec aliquet mi sit amet lectus porta, eu viverra lacus ultrices. Morbi sollicitudin ligula quis justo commodo semper. Sed nulla metus, imperdiet sit amet sem sed, blandit dapibus purus. Curabitur tempus, felis consectetur tempor molestie, ante metus blandit sapien, quis suscipit quam magna a lacus. Nam at dictum velit, et facilisis risus. Vivamus efficitur eros risus. Nulla quis sapien tincidunt, placerat nisl eget, luctus nisi. Vivamus at libero a neque cursus semper.</div>
                </div>
                <div className="sendButton">
                    <div className="sendBtnText">Send</div>
                    <IonIcon className="sendIcon" icon = {Icon.paperPlaneOutline}></IonIcon>
                </div>
            </div>
        </div>
    </>)
}