import './css/toast.css'
import React, { useEffect, useContext } from 'react'

// importing icons 
import { FaCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";
import { IoInformationCircle } from "react-icons/io5";

import toastContext from '../contexts/toasts/toastContexts';

const Toast = (props) => {
  
  const context = useContext(toastContext);
  useEffect(()=>{
    document.querySelector('.toast-container').style.display='none';
  },[])
  useEffect(()=>{
    if(context.toast.type !== '' && context.toast.text !== '')
    {document.querySelector('.toast-container').style.animationName='showToast';
    document.querySelector('.toast-container').style.display='block';
    setTimeout(()=>{
      document.querySelector('.toast-container').style.display='none';
    },6000)}

  },[context.toast])


  return (
    <div className={`toast-container ${context.toast.type}`}>
      <div className="toast">
      <div className='toast-icon'>{
        context.toast.type ==='success' ?
            <FaCheckCircle />
            :
            context.toast.type === 'error' ?
                <MdError />
                :
                context.toast.type ==='warning' ?
                <IoIosWarning />
                : 
                context.toast.type === 'info' ? <IoInformationCircle /> : ""
        }</div>
      <div className='toast-text'>{context.toast.text}</div>
      </div>
    </div>
  )
}

export default Toast
