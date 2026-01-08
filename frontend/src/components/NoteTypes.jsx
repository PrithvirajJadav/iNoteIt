// importing css
import './css/notetype.css'

//importing icons
import { CgClose } from "react-icons/cg";

import React, { useContext, useEffect, useState } from 'react'
import noteContext from '../contexts/notes/noteContexts';
import NoteTypeCard from './NoteTypeCard';
import EmptyResult from './EmptyResult';
import toastContext from '../contexts/toasts/toastContexts';
import { useNavigate } from 'react-router-dom';
import userContext from '../contexts/users/userContexts';
import SearchNotes from './SearchNotes';
// import SearchNotes from './SearchNotes';


const NoteTypes = () => {

    const navigate = useNavigate();
    // Using the context
    const context = useContext(noteContext);
    const contextToast = useContext(toastContext);
    const contextUser = useContext(userContext);

    // Fetching note type on load
    useEffect(() => {
        document.title='iNoteIt - Notes'
        if (!contextUser.loggedin) {
            navigate('/home');
        } else {
            context.fetchNoteTypes();
        }
        // eslint-diable-next-line
    }, [])

    // Defining the States
    const [col, setCol] = useState(["title", "tag", "description"]);

    //Defining Event Handlers
    const addCol = () => {
        let val=document.getElementById('fname').value;
        val=val.trimStart().trimEnd().toLowerCase();
        if(val==='' || val.length < 3){
            contextToast.setToast({type:'error',text:'Field must be of length at least 3.'})
        }
        else if(new RegExp('^[a-z A-Z 0-9]+$').test(val) === false)
        {
            contextToast.setToast({type:'error',text:'Field must be alphanumeric.'})
        }
        else if(col.find((colname)=>{ return colname === val } )){
            contextToast.setToast({type:'error',text:'Field is already Included.'})
        }
        else{
            setCol([...col, val]);
        }
    }

    const handleColDel = (fname) => {
        if (fname === "title") {
            contextToast.setToast({ type: "info", text: "The field " + fname + " is required and cannot be deleted." })
        }
        else {
            const newcol = col.filter((name) => { return name != fname })
            setCol(newcol);
        }
    }

    const handleAddNotetype = (e) => {
        e.preventDefault();
        let name = document.getElementById('ntname').value;
        name=name.trimStart().trimEnd();
        if( name === '' || name.length < 3 || name.length>19){
            contextToast.setToast({type:'error',text:'Length Should be greater than 3 and less than 19.'})
        }
        else if(new RegExp('^[a-z A-Z 0-9]+$').test(name) === false)
        {
            contextToast.setToast({type:'error',text:'Field must be alphanumeric.'})
        }
        else{
            context.addNoteType(name, col);
        }
    }
    return (
        <>
            <div className='container'>
                <div className='notetype-mainhead'>
                    <h1>Notebook Collections</h1>
                </div>

                <div className='notetype-add'>
                    <h2>Create New Notebook</h2>
                    <form onSubmit={handleAddNotetype}>
                        <div className="input-field-name">
                            <input type="text" name="ntname" id="ntname" required />
                            <label htmlFor="ntname">Enter name</label>
                        </div>
                        <div className="input-field-columns">
                            <input type="text" name="fname" placeholder='Enter Field name' id="fname"/>
                            <button type='button' onClick={addCol}>Add</button>
                        </div>
                        <div className='colnames'>
                            {
                                col && col.map((field) => {
                                    return <div className="field" key={field}>
                                        <span>{field}</span>
                                        <button type="button" onClick={() => handleColDel(field)}>&nbsp;<CgClose /></button>
                                    </div>
                                })
                            }
                        </div>
                        <input type="submit" className='btn-sub' value="Add NoteBook" />
                    </form>
                </div>

                <div className='notetype-body'>
                    {
                        context.note_types.length != 0 ? context.note_types.map((type) => {
                            return <div className='notetype-card' key={type._id}>
                                <NoteTypeCard type={type} />
                            </div>
                        }) : <EmptyResult text='No Notebook to display' />

                    }
                </div>
            </div>
            <SearchNotes note_types={context.note_types} />
        </>
    )
}

export default NoteTypes;


