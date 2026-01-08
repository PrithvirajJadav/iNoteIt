import './css/notes.css'
import './css/newnotes.css'

import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import noteContext from '../contexts/notes/noteContexts';
import SearchNotes from './SearchNotes';
import toastContext from '../contexts/toasts/toastContexts';

const Notes = (props) => {
    let clgState = false;

    // Using hooks
    const loc = useLocation();
    const { state } = loc;
    const { type } = state;

    // Loading Context

    const context = useContext(noteContext);
    const contextToast = useContext(toastContext);

    useEffect(() => {
        document.title=`iNoteIt - ${type.name}`
        // console.log(type);
        context.fetchNotes(type._id);
        context.setLoading(true);
        setTimeout(()=>{
            document.querySelector('.search-btn').click();
            context.setLoading(false);
        },3000);
        contextToast.setToast({type:'info',text:'Wait a second...'});
        let fData = {};
        for (let col in type.columns) {
            const field = type.columns[col]
            fData = {
                ...fData,
                [field]: ""
            }
        }
        setFormData(fData);
    }, [])


    const [formData, setFormData] = useState({});

    const handleAddClg = (e) => {
        if (clgState) {
            e.target.style.animationName = 'rot1';
            document.getElementById('addnoteform').style.animationName = 'hideform';

            setTimeout(() => {
                document.getElementById('addnoteform').style.display = 'none';
            }, 750)

            clgState = !clgState;
        } else {
            e.target.style.animationName = 'rot2';
            document.getElementById('addnoteform').style.animationName = 'showform';
            document.getElementById('addnoteform').style.display = 'block';
            clgState = !clgState;
        }
    }
    const handleSave = async (e) => {
        e.preventDefault();
        let fData=formData;
        let flag=true;
        for (let col in type.columns) {
            const field = type.columns[col]
            let content = fData[field];
            console.log(content);
            content=content.trimStart().trimEnd();
            if(content === ' ' || content === ''){
                contextToast.setToast({type:'warning',text:'All fields must be non-empty.'});
                flag=false;
                break;
            }
        }
        if(flag===true){
            await context.storeNotes(type._id, formData);
            document.querySelector('.search-btn').click();
        }
    }
    return (
        <>
            <div className='container-notes'>
                <div className='notes-head'>
                    <h1>
                        {type.name}
                    </h1>
                    <button type='button' onClick={handleAddClg} className='addclg'>
                        &nbsp;+&nbsp;
                    </button>
                </div>
                <div className="notes-add-form">
                    <form action="#" id='addnoteform'>
                        {
                            type.columns.map((col) => {
                                if (col === 'title') {
                                    return <div className='title-div' key={col} contentEditable={true} 
                                    suppressContentEditableWarning
                                    spellCheck={false}
                                    onInput={(e) => { setFormData({ ...formData, [col]: e.currentTarget.textContent }) }}>Enter the title</div>
                                }
                                else {
                                    return <div className='other-div' key={col}>
                                        <div className={`label-div ${col === 'desc' ? 'd-none' : 'd-block'}`}>{col}</div>
                                        <div className='desc-div' contentEditable={true} 
                                        suppressContentEditableWarning
                                        spellCheck={false}
                                        onInput={(e) => { setFormData({ ...formData, [col]: e.currentTarget.innerText }) }}>Enter Detail for {col}</div>
                                    </div>
                                }
                            })
                        }
                        <div className='subdiv'>
                            <button type='submit' onClick={handleSave} className='btn'>Add Note</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className='newdiv'>
            <SearchNotes note_types={[type]}/>
            </div>
        </>
    )
}

export default Notes

