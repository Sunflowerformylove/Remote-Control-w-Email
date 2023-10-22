import { useState } from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import "../Styles/Main.css";

export default function Main(){
    return(
        <div className="mainContainer">
            <Menu></Menu>
        </div>
    );
}