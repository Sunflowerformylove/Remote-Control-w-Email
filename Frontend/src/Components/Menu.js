import { useRef } from "react";
import { IonIcon } from "@ionic/react";
import * as Icon from "ionicons/icons";
import "../Styles/Menu.css"

export default function Menu() {
    const menuRef = useRef(null);
    const describeRef = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)]
    function extendMenu() {
        menuRef.current.classList.toggle("extended");
        describeRef.forEach(element => {
            element.current.classList.toggle("extended");
        })
    }
    return (<>
        <div ref={menuRef} className="menuContainer">
            <div onClick={extendMenu} className="panOut">
                <IonIcon icon={Icon.caretForwardOutline} className="panOutIcon"></IonIcon>
            </div>
            <div className="menu">
                <div className="functionality shutdown">
                    <IonIcon icon={Icon.powerOutline} className="functionalityIcon"></IonIcon>
                    <div ref={describeRef[0]} className="describe">Shutdown</div>
                </div>
                <div className="functionality restart">
                    <IonIcon icon={Icon.refreshCircleOutline} className="functionalityIcon"></IonIcon>
                    <div ref={describeRef[1]} className="describe">Restart</div>
                </div>
                <div className="functionality MAC/IP">
                    <IonIcon icon={Icon.hardwareChip} className="functionalityIcon"></IonIcon>
                    <div ref={describeRef[2]} className="describe">MAC/IP</div>
                </div>
                <div className="functionality task">
                    <IonIcon icon={Icon.desktopOutline} className="functionalityIcon"></IonIcon>
                    <div ref={describeRef[3]} className="describe">Task Manager</div>
                </div>
                <div className="functionality terminal">
                    <IonIcon icon={Icon.terminalOutline} className="functionalityIcon"></IonIcon>
                    <div ref={describeRef[4]} className="describe">Terminal</div>
                </div>
                <div className="functionality screenshot">
                    <IonIcon icon={Icon.apertureOutline} className="functionalityIcon"></IonIcon>
                    <div ref={describeRef[5]} className="describe">Screenshot</div>
                </div>
                <div className="functionality registry">
                    <IonIcon icon={Icon.logoWindows} className="functionalityIcon"></IonIcon>
                    <div ref={describeRef[6]} className="describe">Registry</div>
                </div>
                <div className="functionality registry">
                    <i class="fa-solid fa-keyboard functionalityIcon"></i>
                    <div ref={describeRef[6]} className="describe">Registry</div>
                </div>
            </div>
        </div>
    </>)
}