import noteContext from "./noteContexts.jsx";
import toastContext from "../toasts/toastContexts.jsx";
import { useContext, useState } from "react";

const NoteState = (props) => {

    const [notes,setNotes]=useState([]);
    const [loading,setLoading] = useState(false);

    const context = useContext(toastContext);
    // backend URL 
    const host = import.meta.env.VITE_SERVER_URL;
    //Setting up the states
    const [note_types,setNote_types]=useState([]);

    // Fetching the note types 
    const fetchNoteTypes = async () => {
        const response = await fetch(`${host}/api/notes/notetypes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authToken":sessionStorage.getItem('authToken')
            }
        });

        const result = await response.json();
        if(result.success){
            // updating the state
            setNote_types(result.note_types);

            let new_note_types = result.note_types.forEach(async (note_type)=>{
                const new_response = await fetch(`${host}/api/notes/${note_type._id}`,{
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "authToken":sessionStorage.getItem('authToken')
                    }
                });
                const new_result=await new_response.json();
                if(new_result.success){
                    let newnotes=notes;
                    newnotes[note_type._id]=new_result.notes;
                    setNotes(newnotes);
                }
                else{
                }
            });
            
            setNotes(new_note_types);

            context.setToast({type:"info",text:"Notebooks are Fetched"});
        }
        else{
            context.setToast({type:"error",text:result.error});
        }
    }
    // deleteing note types
    const deleteNoteType= async (id)=>{
        const response = await fetch(`${host}/api/notes/notetypes/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "authToken":sessionStorage.getItem('authToken')
            }
        });
        const result = await response.json();
        if(result.success){
            const newNoteTypes = note_types.filter((value,ind)=>{ return value._id!=id } )
            setNote_types(newNoteTypes);
            context.setToast({type:"success",text:"Notebook is deleted."});

        }
        else{
            context.setToast({type:"error",text:result.error});

        }
    }

    // Adding the Notebook
    const addNoteType=async(name,columns)=>{
        const response = await fetch(`${host}/api/notes/addtype`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authToken":sessionStorage.getItem('authToken')
            },
            body:JSON.stringify({name:name,columns:columns})
        });
        const result= await response.json();
        if(result.success){
            const newNoteTypes = [...note_types,result.note_type]
            setNote_types(newNoteTypes);
            context.setToast({type:"success",text:"Notebook is created."});
        }
        else{
            context.setToast({type:"error",text:result.error});
        }
    }

    // Updating the Notebook
    const updateNoteType= async(id,name)=>{
        const response = await fetch(`${host}/api/notes/notetypes/${id}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "authToken":sessionStorage.getItem('authToken')
            },
            body:JSON.stringify({name:name})
        });
        const result= await response.json();
        if(result.success){
            context.setToast({type:"success",text:"Notebook is Updated."});
        }
        else{
            context.setToast({type:"error",text:result.error});
        }
    }

    // Fetching the Notes
    const fetchNotes = async (id) => {
        const response = await fetch(`${host}/api/notes/${id}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authToken":sessionStorage.getItem('authToken')
            }
        });
        const result= await response.json();
        if(result.success){
            const newnotes=notes;
            newnotes[id]=result.notes;
            setNotes(newnotes);
            context.setToast({type:"info",text:"Notes are fetched"});
        }
        else{
            context.setToast({type:"error",text:result.error});
        }
    }
    
    /* 
        Work pending
    */
    // Storing the notes
    const storeNotes = async (typeId, formData)=>{
        const response = await fetch(`${host}/api/notes/`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authToken":sessionStorage.getItem('authToken')
            },
            body: JSON.stringify({name:typeId,...formData})
        });
        const result = await response.json();
        if(result.success){
            let newnotes=notes;
            newnotes[typeId]=[result.note,...newnotes[typeId]];
            setNotes(newnotes);
            context.setToast({type:"success",text:"Note is added successfully."});
        }
        else{
            context.setToast({type:"error",text:result.error});
        }
    }

    //Deleting notes
    const deleteNotes = async (id,typeId)=>{
        const response = await fetch(`${host}/api/notes/${id}`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "authToken":sessionStorage.getItem('authToken')
            }
        });
        const result = await response.json();
        if(result.success){
            let newnotes=notes;
            newnotes[typeId]=newnotes[typeId].filter((val)=>{ return val._id !== id })
            setNotes(newnotes);
            context.setToast({type:"success",text:"Note is deleted."});
        }else{
            context.setToast({type:"error",text:result.error});
        }
        return result.success;
    }

    // Udating notes
    const updateNotes = async(id,typeId,formData)=>{
        const response = await fetch(`${host}/api/notes/${id}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "authToken":sessionStorage.getItem('authToken')
            },
            body: JSON.stringify({name:typeId,...formData})
        });
        const result = await response.json();
        if(result.success){
            let newnotes=notes;
            newnotes[typeId]=newnotes[typeId].map((val)=>{
                if(val._id===id){
                    return {...result.note};
                }
                else{
                    return val;
                } 
            })
            setNotes(newnotes);
            context.setToast({type:"success",text:"Note is updated successfully."});
            return(result.note);
        }else{
            context.setToast({type:"error",text:result.error});
            return(result.success);
        }
    }

    return (
        <noteContext.Provider value={{fetchNoteTypes,note_types,setNote_types,deleteNoteType,addNoteType,updateNoteType,fetchNotes,notes,setNotes,storeNotes,deleteNotes,updateNotes,loading,setLoading}} >
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState