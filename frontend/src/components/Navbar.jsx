import './css/navbar.css'
//import incons
import { FaUser } from "react-icons/fa";
import { FaBookReader } from "react-icons/fa";
import { TfiMenu } from "react-icons/tfi";
import { CgClose } from "react-icons/cg";


import React, { useEffect, useState, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import userContext from '../contexts/users/userContexts';
import Toast from './Toast';
import toastContext from '../contexts/toasts/toastContexts';

const Navbar = () => {
  // For user menu state
  let menuOpen = true;

  const context = useContext(userContext);
  const contextToast = useContext(toastContext);
  const navigate = useNavigate();
  const loc = useLocation();
  useEffect(() => {
    closeMenu();

  }, [loc])

  const openMenu = () => {
    document.getElementById("togglemenu").style.animationName = "show";
    document.getElementById("togglemenu").style.display = "block";
}
const closeMenu = () => {
  document.getElementById("togglemenu").style.animationName = "hide";
  setTimeout(() => {
      document.getElementById("togglemenu").style.display = "none";
  }, 375)
}
const handleLogBtn = () => {
  if (!context.loggedin) {
      navigate('/signin');
  }
  else {
      sessionStorage.removeItem('authToken');
      sessionStorage.removeItem('loggedin');
      sessionStorage.removeItem('name');
      sessionStorage.removeItem('email');
      context.setLoggedin(false);
      navigate('./home');
      menuOpen=false;
      document.querySelector('.loggedin').style.display='none';
      contextToast.setToast({type:"success",text:"Logged out Successfully."})
      
      
  }
}

const handleUser = ()=>{
  if(menuOpen!=false){
      document.querySelector('.loggedin').style.display='block';
      }
  else{
      document.querySelector('.loggedin').style.display='none';
  }
  menuOpen=!menuOpen;
}

  return (
    <div>
            <Toast type='success' text='Wow, That was Cool.' />
            <nav>
                <div className="appname" onClick={()=>{
                  navigate('/')
                }}>
                    <span>
                        <FaBookReader />
                    </span>
                    iNoteIt
                </div>
                <div>
                    <ul className="navlink">
                        <li><Link className={loc.pathname === "/home" || loc.pathname === "/" ? "active" : ""} to="/home">Home</Link></li>
                        <li className={context.loggedin ? "d-block" : "d-none"}><Link className={loc.pathname === "/notetypes" ? "active" : ""} to="/notetypes">Notes</Link></li>
                        <li><Link className={loc.pathname === "/about" ? "active" : ""} to="/about">About Us</Link></li>
                        <li><Link className={loc.pathname === "/contact" ? "active" : ""} to="/contact">Contact Us</Link></li>
                    </ul>
                </div>
                <div className="navbtn">
                    <button className={`btn ${context.loggedin ? "d-none" : "d-inline"}`} onClick={handleLogBtn} type="button">{context.loggedin ? "Log out" : "Log in"}</button>
                    <button className="btn menuicon" onClick={openMenu} type="button">&nbsp;<TfiMenu />&nbsp;</button>
                    <button className={`btn btn-user ${context.loggedin ? "d-inline" : "d-none"}`} onClick={handleUser} type="button">&nbsp;<FaUser />&nbsp;</button>
                    <div className="loggedin">
                        <ul>
                            <li>{sessionStorage.getItem('name')}</li>
                            <li>{sessionStorage.getItem('email')}</li>
                            <li className='.logoutlink'><button type='button' onClick={handleLogBtn}>LogOut</button></li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="togglemenu" id="togglemenu">
                <div className="togglehead">
                    <div>
                        iNoteIt
                    </div>
                    <div>
                        <button className="closebtn" onClick={closeMenu} type="button">&nbsp;<CgClose />&nbsp;</button>
                    </div>
                </div>
                <ul>
                    <li className={loc.pathname === "/home" || loc.pathname === "/" ? "active" : ""} ><Link to="/home">Home</Link></li>
                    <li className={loc.pathname === "/notetypes" ? "active" : ""}><Link className={context.loggedin ? "d-block" : "d-none"} to="/notetypes">Notes</Link></li>
                    <li className={loc.pathname === "/about" ? "active" : ""}><Link to="/about">About Us</Link></li>
                    <li className={loc.pathname === "/contact" ? "active" : ""}><Link to="/contact">Contact Us</Link></li>
                </ul>
            </div>
        </div>
  )
}

export default Navbar
