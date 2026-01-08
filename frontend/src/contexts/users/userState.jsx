import { useContext } from "react";
import userContext from "./userContexts.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toastContext from "../toasts/toastContexts.jsx";

const UserState = (props) => {

    const context = useContext(toastContext);

    // backend URL 
    const host = import.meta.env.VITE_SERVER_URL;
    // in order to navigate
    const navigate = useNavigate();
    // setting up the states
    const [loggedin, setLoggedin] = useState(sessionStorage.getItem('loggedin'));


    // Contollers
    // For Registration
    const register = async (name, email, password) => {
        // Fetching from api calls
        let response = await fetch(`${host}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        });

        let res = await response.json();
        if (res.success) {
            setLoggedin(true);
            sessionStorage.setItem('loggedin', true);
            sessionStorage.setItem('authToken', res.authToken);

            response = await fetch(`${host}/api/auth/getuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authToken": sessionStorage.getItem('authToken')
                }
            });

            res = await response.json();
            if (res.success) {
                sessionStorage.setItem('name', res.user.name);
                sessionStorage.setItem('email', res.user.email);
                navigate('/home');
                context.setToast({ type: "success", text: "Registered Successfully." })
            } 
            else{
                context.setToast({ type: "error", text: res.error });
            }
        }
        else {
            
            if(res.errors){
                let msg=" ";
                res.errors.forEach((err)=>{
                    msg=msg+err.msg+"\n";
                })
                context.setToast({ type: "error", text: msg });
            }
            else{
                context.setToast({type:"error",text:res.error});
            }

        }
    }
    // Controller for login
    const login = async (email, password) => {
        let response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        let res = await response.json();
        if (res.success) {
            setLoggedin(true);
            sessionStorage.setItem('loggedin', true);
            sessionStorage.setItem('authToken', res.authToken);

            response = await fetch(`${host}/api/auth/getuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authToken": sessionStorage.getItem('authToken')
                }
            });

            res = await response.json();
            if (res.success) {
                sessionStorage.setItem('name', res.user.name);
                sessionStorage.setItem('email', res.user.email);
                navigate('/home');
                context.setToast({ type: "success", text: "Logged in Successfully." })
            } 
            else{
                context.setToast({ type: "error", text: res.error });
            }

        }
        else {
            if(res.errors){
                let msg=" ";
                res.errors.forEach((err)=>{
                    msg=msg+err.msg+"\n";
                })
                context.setToast({ type: "error", text: msg });
            }
            else{
                context.setToast({type:"error",text:res.error});
            }
        }
    }

    // Setting up the context
    return (
        <userContext.Provider value={{ loggedin, setLoggedin, register, login }} >
            {props.children}
        </userContext.Provider>
    )
}

export default UserState