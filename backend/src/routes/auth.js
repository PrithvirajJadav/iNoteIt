import { Router } from "express";
import Users from "../models/Users.js";
import NoteTypes from "../models/NoteTypes.js";
import bcrypt from 'bcryptjs'; 
import jwt from "jsonwebtoken";
const JWT_SECRET_KEY = "AcknowledgeYourTribelCheif";
import { body } from 'express-validator';
import fetchUserId from "../middlewares/fetchUserId.js";
import validate from "../middlewares/validate.js";

const router = Router();

router.get("/api/auth",async (req,res)=>{
    try{
        const user= await Users.find({});
        res.status(200).json({user,"sucsess":true});
    }catch(err){
        console.error(err.message);
        res.status(500).json({"success":false});
    }
})

router.get("/api/auth/:id", async(req,res)=>{
    const {params:{id}}=req;
    try {       
        if(id){
            const user=await Users.findOne({_id:id});
            if(!user)
                return res.status(404).json({"error":"User does not exists.","success":false})
            return res.status(200).json({user, "success" : true });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({"success":false});
    }
})

router.post("/api/auth/register", 
[body("name","Name should contain atleast 3 character.").isString().isLength({min:3}),
    body("email","Enter the valid email.").isEmail()
    ,body("password","Password should contain atleast 8 characters.").isString().isLength({min:8})]
,validate,async (req, res) => {
    try {
        let user = await Users.findOne({email:req.body.email})
        if(user){
            return res.status(400).json({"error":"User with same email already exists.","success":false});
        }
        const salt= await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password, salt)

        user = await Users.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email
        });
        const data={
            user:{
                id:user.id
            }
        }
        const authToken=jwt.sign(data,JWT_SECRET_KEY);

        await NoteTypes.create({
            user:user.id,
            name:"myJournal",
            columns:["title","desc"]
        })

        return res.status(201).json({"authToken":authToken,"success":true});
    }
    catch(err){
        console.log(err.message);
        res.status(500).send({"error":"Database Error.","success":false})
    }
})

router.post("/api/auth/login",
[body("password","Password should contain atleast 8 characters.").isString().isLength({min:8}),body("email","Enter the valid email").isEmail()]
,validate,async (req,res)=>{
    try {
        const user = await Users.findOne({email:req.body.email})
        if(!user){
            return res.status(400).json({"error":"Try to login with currect credentials.","success":false});
        }
        const passCmp=await bcrypt.compare(req.body.password, user.password);
        if(!passCmp){
            return res.status(400).json({error:"Try to login with correct credientails.","success":false})
        }
        const data={
            user:{
                id:user.id
            }
        }
        const authToken=jwt.sign(data,JWT_SECRET_KEY);
        return res.status(200).json({"authToken":authToken,"success":true});
    }
    catch(err){
        console.log(err.message);
        res.status(500).send({"error":"Database Error.","success":false})
    }
});

router.post("/api/auth/getuser",fetchUserId, async (req,res)=>{
    try {
        const userId=req.user.id;
        const user = await Users.findOne({_id:userId}).select("-password");
        res.status(200).json({user,"success":true});
    } catch (err) {
        console.log(err.message);
        res.status(500).json({"error":"Internal Server Error.","success":false}); 
    }
});

export default router;