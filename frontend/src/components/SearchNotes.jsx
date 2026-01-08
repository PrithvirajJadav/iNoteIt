
import React,{useContext,useState,useEffect} from 'react'

import noteContext from '../contexts/notes/noteContexts';
import EmptyResult from './EmptyResult';
import NoteModal from './NoteModal';

// Importing the icons
import { TbEyeEdit } from "react-icons/tb";
import { FaTrashArrowUp } from "react-icons/fa6";


const SearchNotes = (props) => {

    
    const context = useContext(noteContext);
    // Defining the states
    const [currentNote, setCurrentNote] = useState({});
    const [update, setUpdate] = useState(false);
    const [searchNotes,setSearchNotes]=useState([]);
    const [typeId,setTypeId] = useState("");
    const [columns,setColumns]=useState([]);
    
    // For cloning the object copying
    function clone(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }
    
    // Event Handlers
    const handleDel = (id,typeId) => {
        // id is needed for deleting the note at fronted react state.
        const res=context.deleteNotes(id,typeId)
        if(res){
            let newsearchednotes=searchNotes.filter((val)=>{
                if(val._id!==id){
                    return val
                }
            });
            setSearchNotes([...newsearchednotes]);
        }
    }

    const handleSearch = () => {
        let dummy=clone(context.notes);
        const word = document.getElementById('newsearch').value;
        let newsearchednotes = [];
        props.note_types.forEach((note_type) => {
            dummy[note_type._id].forEach((note) => {
                let flag=false;
                note_type.columns.forEach((col) => {
                    let newcontent = note[col].replace(new RegExp(word, "gi"), (match)=>{
                       return `<em>${match}</em>`
                });
                    if (newcontent !== note[col]) {
                        flag = true;
                        note[col]=newcontent;
                        note["type"]=note_type.name;
                    }
                })
                if(flag){
                    newsearchednotes.push(note);
                }
            })
        })
        setSearchNotes([...newsearchednotes]);

    }

    const handleOpenModal = (cNote) => {
        setTypeId(cNote.name);
        const note_type=props.note_types.filter((val)=>{
            if(val._id == cNote.name)
                return val;
        })
        setColumns(note_type[0].columns);
        const modal = document.getElementById('modal');
        setCurrentNote(cNote);
        modal.showModal();
    }

    const handleUpdateToggler = async (id,typeId,data) => {
        if (update) {
            const res=await context.updateNotes(id, typeId, data);
            if(res){
                let newsearchednotes= searchNotes.map((val)=>{
                    if(val._id === id)
                        return res;
                    else
                        return val;
                })
                setSearchNotes([...newsearchednotes]);
            }
        }
        setUpdate(!update);
    }

    return (
        <>
            <div className='container-search'>
                <div className='search-input-field'>
                    <div className='search-input'>
                        <input type="text" name="search" placeholder='Enter word for search' id='newsearch' />
                    </div>
                    <button type='button' className='search-btn' onClick={handleSearch}>Search</button>
                </div>
            </div>
            <NoteModal note={currentNote} columns={columns} typeId={typeId} handleUpdateToggler={handleUpdateToggler} update={update} setUpdate={setUpdate} />
            <div className="container">
                {
                    searchNotes.length !== 0 ? searchNotes.map((val, i) => {
                        const date = new Date(val.date);
                        return <div key={val._id + i} className='noteitem'>
                            <div onClick={() => handleOpenModal(val)}>
                                <h2 dangerouslySetInnerHTML={{ __html: val.title }} ></h2>
                                <h3>{val.type}</h3>
                                <h4>{date.getDate()}/{date.getMonth()}/{date.getFullYear()}</h4>
                            </div>
                            <div>
                                <button type='button' onClick={() => handleOpenModal(val)} style={{ color: 'green' }}><TbEyeEdit /></button>
                                <button type='button' onClick={() => handleDel(val._id,val.name)}><FaTrashArrowUp /></button>
                            </div>
                        </div>
                    }) : <EmptyResult text={searchNotes.length == 0 ? context.loading ? 'Loading Notes...' :'No notes are to be displayed.' : 'Notes with specified tag does not exists.'} />
                }

            </div>
        </>
    )
}

export default SearchNotes
