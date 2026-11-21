
import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

const connectToMongo = ()=>{
    mongoose.connect(MONGO_URI).then(()=>{
        console.log("Connection to Mongo Successfully.");
    }).catch((err)=>console.log(`Error: ${err}`));
};

export default connectToMongo;

