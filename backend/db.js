
import mongoose from "mongoose";
const mongoURI = "mongodb://localhost:27017/inoteit";

const connectToMongo = ()=>{
    mongoose.connect(mongoURI).then(()=>{
        console.log("Connection to Mongo Successfully.");
    }).catch((err)=>console.log(`Error: ${err}`));
};

export default connectToMongo;

