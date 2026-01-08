import toastContext from "./toastContexts.jsx";
import { useState } from "react";

const ToastState = (props) => {
    
    const [toast,setToast] = useState({type:"",text:""});

    return (
        <toastContext.Provider value={{toast,setToast}} >
            {props.children}
        </toastContext.Provider>
    )
}

export default ToastState;