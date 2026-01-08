import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';

// importing icons
import { FaEdit } from "react-icons/fa";
import { TbEyeEdit } from "react-icons/tb";
import { FaTrashArrowUp } from "react-icons/fa6";
import { TfiSave } from "react-icons/tfi";

import noteContext from '../contexts/notes/noteContexts';
import toastContexts from '../contexts/toasts/toastContexts';

const NoteTypeCard = (props) => {

    const navigate = useNavigate();

    // Using the context
    const context = useContext(noteContext);
    const contextToast = useContext(toastContexts);

    const { type } = props;

    // Defining the States
    const [text, setText] = useState(type.name);
    const [update, setUpdate] = useState(false);

    // Event Handlers
    const handleDel = (id) => {
        context.deleteNoteType(id);
    }
    const handleUpdate = (id) => {
        if (update) {
            let name=document.getElementById(id).value;
            name=name.trimStart().trimEnd();
            if( name === '' || name.length < 3 || name.length>19){
                contextToast.setToast({type:'error',text:'Length Should be greater than 3 and less than 19.'})
            }
            else if(new RegExp('^[a-z A-Z 0-9]+$').test(name) === false)
            {
                contextToast.setToast({type:'error',text:'Field must be alphanumeric.'})
                document.getElementById(id).focus();
            }
            else{
                context.updateNoteType(id,name);
                setUpdate(!update);
            }
        }
        else {
            document.getElementById(id).focus();
            setUpdate(!update);
        }
    }
    const handleChange = (e) => {
        if (update) {
            setText(e.target.value);
        }
        else {
            setText(text);
        }
    }
    const handleView = (id) => {
        navigate('/notes',{state:{
            type:type
        }});
    }

    return (
        <div>
            <div className='card-head'>
                <div>
                    <input className='notename-card' type="text" onChange={handleChange} name="lname" id={type._id} value={text} />
                </div>
                <div>
                    <button type='button' onClick={() => handleUpdate(type._id)} style={{ color: "darkturquoise" }}>{!update ? <FaEdit /> : <TfiSave />}</button>
                    <button type='button' onClick={() => handleView(type._id) } style={{ color: "green" }}><TbEyeEdit /></button>
                    <button type='button' onClick={() => handleDel(type._id)} style={{ color: "crimson" }}><FaTrashArrowUp /></button>
                </div>
            </div>
            <div className="card-body">
            <h3>{type.columns.map((col) => {
                return <p key={col} className={`${ col === 'desc' ? 'd-none' : 'd-block' }`}>{col}</p>
            })}</h3>
            </div>
        </div>
    )
}

export default NoteTypeCard
