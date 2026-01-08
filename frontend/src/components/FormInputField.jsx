import React from 'react'
import './css/forminput.css'
const FormInputField = (props) => {
    return (
        <div>
            <div className="input-field">
                <input type={props.type} name={props.name} id={props.id} onChange={props.handleChange} required />
                <label htmlFor={props.name}>{props.label}</label>
            </div>
        </div>
    )
}

export default FormInputField;