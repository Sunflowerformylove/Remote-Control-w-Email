import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../Styles/Login.css"
import Input from "./Input"
import { toast } from "react-toastify";

export default function Login(props) {
    const [form, setForm] = useState({});
    const [registerRedirect, setRegisterRedirect] = useState(false);
    const [mainRedirect, setMainRedirect] = useState(false);

    function handleCallback(inputName, value) {
        setForm({ ...form, [inputName]: value });
    }

    function Login(){
        axios.post("http://localhost:2909/auth/login", form, {
            headers: {
                "Content-Type": "application/json",
            }
        }).then((response) => {
            return response.data;
        }).then((data) => {
            if(data.status === 200){
                toast.success(data.message);
                setMainRedirect(true);
            } else {
                toast.error(data.message);
            }
        }).catch((error) => {});
    }

    function redirectRegister(){
        setRegisterRedirect(true);
    }

    useEffect(() => {
        if(registerRedirect){
                        
        }
        if(mainRedirect){
            props.history.push("/");
        }
    }, [registerRedirect, mainRedirect, props.history]);

    return (<>
        <div className="loginContainer">
            <div className="registerRedirect" onClick = {redirectRegister}>Doesn't have an account? <div className="emphasize">Register now</div>!</div>
            <Input
                parentCallback={handleCallback}
                className="Input"
                inputName="email"
                labelName="Email"
                type="email"
            ></Input>
            <Input
                parentCallback={handleCallback}
                className="Input"
                inputName="password"
                labelName="Password"
                type="password"
            ></Input>
            <div className="loginSubmit" onClick={Login}>Login</div>
        </div>
    </>)
}