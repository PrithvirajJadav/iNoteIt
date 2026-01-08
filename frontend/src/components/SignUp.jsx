import './css/sign.css'
import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import userContext from '../contexts/users/userContexts'
import FormInputField from './FormInputField'
import toastContexts from '../contexts/toasts/toastContexts'

const SignUp = () => {
  const context = useContext(userContext);
  const contextToast = useContext(toastContexts);
  const [form, setForm] = useState({ "name": "", "email": "", "password": "", "cpassword": "" })

  useEffect(() => {
    document.title = 'iNoteIt - SignUp';
  })

  // Event Handlers 
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    let name=form.name.trimStart().trimEnd();
    let email=form.email.trim();
    let password=form.password.trim();
    let cpassword=form.cpassword.trim();
    if(cpassword === password){
      context.register(name, email, password);
    }
    else{
      contextToast.setToast({type:'error',text:'Password and Confirm Password are not same.'})
    }
  }
  return (
    <div className='signparent'>
      <div className="signcontainer">
        <div className="signheading">
          <h2>Join Us Today</h2>

          <h3>Create Your Personalized Digital Notebook</h3>

          <h4>Sign up now to start organizing your notes with ease and flexibility. Customize your fields, keep track of
            your thoughts, and access your notes from anywhere.</h4>
        </div>
        <div className="signmain">
          <h1>SignUp</h1>
          <form onSubmit={handleSubmit}>
            <FormInputField type="text" name="name" id="name" handleChange={handleChange} label="Enter Username" />
        
            <FormInputField type="text" name="email" id="email" handleChange={handleChange} label="Enter Email" />
            
            <FormInputField type="password" name="password" id="password" handleChange={handleChange} label="Enter Password" />
            
            <FormInputField type="password" name="cpassword" id="cpassword" handleChange={handleChange} label="Confirm Password" />
            
            <div className="signfooter">
              <input type="submit" className="btn" value="Register" />
              <p>Have an account already ? <Link to="/signin">Login Now</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp
