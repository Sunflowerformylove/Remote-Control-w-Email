import { useEffect, useRef } from "react";
import { IonIcon } from "@ionic/react";
import * as Icon from "ionicons/icons";
import "../Styles/Menu.css"

export default function Menu(props) {
    const menuRef = useRef(null);
    const describeRef = [useRef(null), useRef(null), useRef(null), useRef(null),
    useRef(null), useRef(null), useRef(null), useRef(null),
    useRef(null), useRef(null)];
    const functionalityRef = [useRef(null), useRef(null), useRef(null), useRef(null),
    useRef(null), useRef(null), useRef(null), useRef(null),
    useRef(null), useRef(null)];
    function extendMenu() {
        menuRef.current.classList.toggle("extended");
        describeRef.forEach(element => {
            element.current.classList.toggle("extended");
        });
    }

    function setActive(index) {
        props.setChosenFunctionality(index);
    }

    return (<>
        <div ref={menuRef} className="menuContainer">
            <div onClick={extendMenu} className="panOut">
                <IonIcon icon={Icon.caretForwardOutline} className="panOutIcon"></IonIcon>
            </div>
            <div className="menu">
                <div onClick={() => setActive(0)} ref={functionalityRef[0]} className="functionality shutdown">
                    <IonIcon icon={Icon.powerOutline} className="functionalityIcon"></IonIcon>
                    <div ref={describeRef[0]} className="describe">Shutdown</div>
                </div>
                <div onClick={() => setActive(1)} ref={functionalityRef[1]} className="functionality restart">
                    <IonIcon icon={Icon.moonOutline} className="functionalityIcon"></IonIcon>
                    <div ref={describeRef[1]} className="describe">Sleep</div>
                </div>
                <div onClick={() => setActive(2)} ref={functionalityRef[2]} className="functionality MAC/IP">
                    <IonIcon icon={Icon.hardwareChipOutline} className="functionalityIcon"></IonIcon>
                    <div ref={describeRef[2]} className="describe">MAC/IP</div>
                </div>
                <div onClick={() => setActive(3)} ref={functionalityRef[3]} className="functionality task">
                    <IonIcon icon={Icon.desktopOutline} className="functionalityIcon"></IonIcon>
                    <div ref={describeRef[3]} className="describe">Task Manager</div>
                </div>
                <div onClick={() => setActive(4)} ref={functionalityRef[4]} className="functionality terminal">
                    <IonIcon icon={Icon.terminalOutline} className="functionalityIcon"></IonIcon>
                    <div ref={describeRef[4]} className="describe">Terminal</div>
                </div>
                <div onClick={() => setActive(5)} ref={functionalityRef[5]} className="functionality screenshot">
                    <IonIcon icon={Icon.apertureOutline} className="functionalityIcon"></IonIcon>
                    <div ref={describeRef[5]} className="describe">Screenshot</div>
                </div>
                <div onClick={() => setActive(6)} ref={functionalityRef[6]} className="functionality keylogger">
                    <i className="fa-regular fa-keyboard functionalityIcon"></i>
                    <div ref={describeRef[6]} className="describe">Keylogger</div>
                </div>
                <div onClick={() => setActive(7)} ref={functionalityRef[7]} className="functionality terminate">
                    <IonIcon icon={Icon.leafOutline} className="functionalityIcon"></IonIcon>
                    <div ref={describeRef[7]} className="describe">Terminate</div>
                </div>
                <div onClick={() => setActive(8)} ref={functionalityRef[8]} className="functionality folder">
                    <IonIcon icon={Icon.folderOutline} className="functionalityIcon"></IonIcon>
                    <div ref={describeRef[8]} className="describe">Folder Tree</div>
                </div>
                <div onClick={() => setActive(9)} ref={functionalityRef[9]} className="functionality systemInfo">
                    <IonIcon icon={Icon.logoWindows} className="functionalityIcon"></IonIcon>
                    <div ref={describeRef[9]} className="describe">System Info</div>
                </div>
            </div>
        </div>
    </>)
}