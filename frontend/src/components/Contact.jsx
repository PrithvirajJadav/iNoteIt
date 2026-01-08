import ContactInputField from './ContactInputField';
import './css/contact.css';

import React,{useEffect} from 'react'
import ContactTextField from './ContactTextField';


const Contact = () => {

  useEffect(()=>{
    document.title='iNoteIt - Contact Us';
  },[])
  const sendEmail = () => {
   // Remaining
  }

  return (
    <div className='contact-parent'>
        <div className='contact-icon'>

        </div>
        <div className='contact-container'>
            <div className='contact-form'>
                <h1>Contact Us</h1>
                <form>
                    <ContactInputField name='urname' id='urname' label='Username' type='text' required />
                    <ContactInputField name='subject' id='subject' label='Subject' type='text' required />
                    <ContactTextField name='message' id='message' label='Message' required />
                    <button type="button" onClick={sendEmail}>Send</button>
                </form>
            </div>
        </div>
      
    </div>
  )
}

export default Contact
