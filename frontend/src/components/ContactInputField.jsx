import React from 'react'
import './css/contact.css'
const ContactInputField = (props) => {
    return (
        <div>
            <div className="contact-input-field">
                <label htmlFor={props.name}>{props.label}</label>
                <input type={props.type} name={props.name} id={props.id} onChange={props.handleChange} required />
            </div>
        </div>
    )
}

export default ContactInputField;
