import React from 'react'
import './css/contact.css'
const ContactTextField = (props) => {
  return (
    <div className='contact-text-field'>
        <label htmlFor={props.name}>{props.label}</label>
        <textarea name={props.name} id={props.id} onChange={props.onChange} required></textarea>
    </div>
  )
}

export default ContactTextField
