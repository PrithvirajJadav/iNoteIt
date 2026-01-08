import { Router } from 'express';
import Notes from '../models/Notes.js'
import { body } from 'express-validator';
import fetchUserId from "../middlewares/fetchUserId.js";
import validate from "../middlewares/validate.js";
import fetchNoteType from '../middlewares/fetchNoteType.js';
import NoteTypes from "../models/NoteTypes.js";
import Users from '../models/Users.js';
const router = Router();

// for adding the note
router.post("/api/notes", fetchUserId, fetchNoteType, async (req, res) => {
    try {
        const userId = req.user.id;
        let note = new Notes({ ...req.body, user: userId });
        note = await note.save();
        return res.status(200).json({ note, "success": true });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send({ "error": "Database Error.", "success": false })
    }
})

// for editing the note
router.put("/api/notes/:id",
body("name","Note type is note specified.").isLength({min:1})
,validate,fetchUserId, fetchNoteType, async (req, res) => {
    const id = req.params.id;
    if (!id)
        return res.status(400).json({ "error": "Note id is not specified.", "success": false });
    const userId = req.user.id;
    try {
        const user = await Users.findOne({ _id: userId });
        if (!user)
            return res.status(401).json({ "error": "Invalid Token !", "success": false });
        const note = await Notes.findOne({
            _id: id
        });
        if (!note)
            return res.status(400).json({ "error": "Note Does not exists.", "success": false });
        if (note.user === userId)
            return res.status(401).json({ "error": "Access Denied.", "success": false });
        let newnote = { ...req.body, user: userId };
        newnote = await Notes.findByIdAndUpdate(id, { $set: newnote }, { new: true });

        return res.status(200).json({ "note":newnote, "success": true });

    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ "error": "Database Error.", "success": false })
    }
})


// deleting the perticular note
router.delete("/api/notes/:id",fetchUserId,async (req,res)=>{
    const id = req.params.id;
    if(!id)
        return res.status(400).json({ "error": "Note id is not specified.", "success": false });
    const userId=req.user.id;
    try{
        const user = await Users.findOne({_id:userId});
        if(!user)
            return res.status(401).json({ "error": "Invalid Token !", "success": false });

        const note = await Notes.findByIdAndDelete(id);
        if(note)
            return res.status(200).json({"success":true});
        else
            return res.status(400).json({"error":"Invalid Note Id.","success":false})
    }catch(error){
        console.error(error.message);
        res.status(500).send({ "error": "Database Error.", "success": false })
    }
});

//getting all note types corresponding to the user

router.get("/api/notes/notetypes",fetchUserId, async (req,res)=>{
    const userId=req.user.id;
    try {
        const user = await Users.findOne({_id:userId});
        if(!user)
            return res.status(401).json({ "error": "Invalid Token !", "success": false });
        
        const note_types = await NoteTypes.find({user:userId});
        if(note_types){
            return res.status(200).json({note_types:note_types , "success":true});
        }
        else{
                return res.status(500).json({"error":"INteral Server Error.","success":false})
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({"error":"Interal Server Error.","success":false});
    }
})

// getting all notes corresponding to that user
router.get("/api/notes/:id",fetchUserId,async (req,res)=>{
    const id = req.params.id;
    if (!id)
        return res.status(400).json({ "error": "NoteType id is not specified.", "success": false });
    const userId = req.user.id;
    try {
        const user = await Users.findOne({ _id: userId });
        if (!user)
            return res.status(401).json({ "error": "Invalid Token !", "success": false });
        const notes=await Notes.find({name:id}).sort({_id:-1});
        if(notes)
            return res.status(200).json({notes:notes,"success":true})
        else
            return res.status(400).json({"error":"Invalid NoteType.","success":false})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({"error":"Iternal Server Error.","success":false})
    }

})

// adding note types 
router.post("/api/notes/addtype",fetchUserId,
[
    body("name","Note name must be specified.").isLength({min:1}),
    body("columns","Columns must be specified.").isLength({min:1})
]
,validate
,async (req,res)=>{
    try {
        let note_type=await NoteTypes.create({user:req.user.id,name:req.body.name,columns:req.body.columns});
        return res.status(201).json({note_type,"success":true});
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({"error":"Internal Server Error"});
    }
})
export default router;

// deleting notetypes 

router.delete("/api/notes/notetypes/:id",fetchUserId, async (req,res)=>{
    const id = req.params.id;
    if (!id)
        return res.status(400).json({ "error": "NoteType id is not specified.", "success": false });
    const userId = req.user.id;
    try {
        const user = await Users.findOne({ _id: userId });
        if (!user)
            return res.status(401).json({ "error": "Invalid Token !", "success": false });
        const notetype = await NoteTypes.findByIdAndDelete(id);
        if(notetype){
            while(await Notes.findOneAndDelete({name:id}));
            return res.status(200).json({"success":true});
        }
        else
            return res.status(400).json({"error":"Invalid NoteType.","success":false})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({"error":"Iternal Server Error.","success":false})
    }
})

// Updating notetypes

router.put("/api/notes/notetypes/:id",fetchUserId, async (req,res)=>{
    const id = req.params.id;
    if (!id)
        return res.status(400).json({ "error": "NoteType id is not specified.", "success": false });
    const userId = req.user.id;
    try {
        const user = await Users.findOne({ _id: userId });
        if (!user)
            return res.status(401).json({ "error": "Invalid Token !", "success": false });
        const notetype = await NoteTypes.findByIdAndUpdate(id,{ name:req.body.name });
        if(notetype)
            return res.status(200).json({"success":true});
        else
            return res.status(400).json({"error":"Invalid NoteType.","success":false})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({"error":"Iternal Server Error.","success":false})
    }
})