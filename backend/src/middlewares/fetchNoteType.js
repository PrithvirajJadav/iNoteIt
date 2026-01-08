import NoteTypes from "../models/NoteTypes.js";

const fetchNoteType = async (req,res,next)=>{
    try {       
        if(req.body.name){
            const _type=await NoteTypes.findOne({_id:req.body.name});
            if(!_type)
                return res.status(404).json({"error":"Note type not exists.","success":false})
            next();
        }
        else return res.status(400).json({"error":"Provide Currect Information.","success":false});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({"success":"false"});
    }
}

export default fetchNoteType;