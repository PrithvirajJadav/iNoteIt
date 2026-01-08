import mongoose from "mongoose";
const {Schema} = mongoose;

const noteSchema=new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userinfos',
        required:true
    },
    name:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'notetypes',
        required:true
    },
    title:{
        type:String,
        
    },
    description:{
        type:String,
        
    },
    date:{ 
        type:Date,
        default:Date.now
    }
},{strict:false});

export default mongoose.model('notes',noteSchema);