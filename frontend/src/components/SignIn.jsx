import './css/sign.css'
import userContext from '../contexts/users/userContexts';

import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import FormInputField from './FormInputField';

const SignIn = () => {
  useEffect(() => {
    document.title = 'iNoteIt - SignIn';
  }, [])


  const context = useContext(userContext);
  const [form, setForm] = useState({ "email": "", "password": "" })

  // Event Handlers  
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    context.login(form.email, form.password);
  }


  return (
    <div className='signparent'>
            <div className="signcontainer">
                <div className="signheading">
                    <h2>Welcome Back</h2>

                    <h3>Log In to Your iNotebook</h3>

                    <h4>Access your personalized notebook and keep your notes organized. Log in below to continue where you left
                        off.</h4>
                </div>
                <div className="signmain">
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <FormInputField type="text" name="email" handleChange={handleChange} id="email" label="Enter Email" />
                        
                        <FormInputField type="password" name="password" handleChange={handleChange} id="password" label="Enter Password" />
                        
                        <div className="signfooter">
                            <input type="submit" className="btn" value="Submit" />
                            <p>Don't have an account ? <Link to="/signup">Register Now</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
  )
}

export default SignIn
