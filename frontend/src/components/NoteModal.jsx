import './css/newnotes.css'

// importing icons 
import { FaEdit } from 'react-icons/fa';
import { TfiSave } from 'react-icons/tfi';
import { IoClose } from "react-icons/io5";

import React, { useState, useEffect, useContext } from 'react'

import toastContext from '../contexts/toasts/toastContexts';
import noteContext from '../contexts/notes/noteContexts';


const NoteModal = (props) => {
    const context = useContext(noteContext);

    // // Defining States
    const update=props.update;
    const setUpdate=props.setUpdate;

    const [formData, setFormData] = useState({});

    useEffect(() => {
        let fData = {};
        for (let col in props.columns) {
            const field = props.columns[col]
            let content = props.note[props.columns[col]]
            content = content.replace(new RegExp('<em>', 'gi'), '').replace(new RegExp('</em>', 'gi'), '');
            // console.log(content);
            fData = {
                ...fData,
                [field]: content
            }
        }
        setFormData(fData);
    }, [props.note])

    // Event Handlers 

    // handleUpdateToggler

    const handleClose = () => {
        document.getElementById('modal').close();
    }

    

    const date = new Date(props.note.date);

    

    return (
        <>
            <dialog id='modal'>
                <div className="notemodal-container">
                    <div className="notemodal-header">
                        <div className="notemodal-heading">
                            <div className='title-div'
                                contentEditable={update}
                                suppressContentEditableWarning
                                spellCheck={false}
                                onInput={(e) => { const result = e.currentTarget.textContent; setFormData({ ...formData, ['title']: result }) }}
                                dangerouslySetInnerHTML={{ __html: props.note['title'] }}></div>
                            <h3>{props.note.type}</h3>
                            <h4>{date.getDate()}/{date.getMonth()}/{date.getFullYear()}</h4>

                        </div>
                        <div className="notemodal-btns">
                            <button type='button' onClick={()=>props.handleUpdateToggler(props.note._id,props.typeId,formData)}>{!update ? <FaEdit /> : <TfiSave />}</button>
                            <button type="button" onClick={handleClose} style={{color:'grey'}}><IoClose /> </button>
                        </div>
                    </div>
                    <div className="notemodal-body">
                        {
                            props.columns.map((col,i) => {
                                if (col !== 'title') {
                                    return <div className='other-div' key={1+i}>
                                        <div className={`label-div ${col === 'desc' ? 'd-none' : 'd-block'}`}>{col}</div>
                                        <div className='desc-div' contentEditable={update}
                                            suppressContentEditableWarning
                                            spellCheck={false}
                                            onInput={(e) => {
                                                let result = e.currentTarget.innerText;
                                                result = result;
                                                setFormData({ ...formData, [col]: result })
                                            }} dangerouslySetInnerHTML={{ __html: props.note[col] }}></div>
                                    </div>
                                }
                                else return <div className="d-none" key={0}></div>
                            })
                        }
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default NoteModal
