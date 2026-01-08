import mongoose, { Mongoose } from "mongoose";
const {Schema} = mongoose;

const noteTypeSchema=new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userinfos',
        required:true
    },
    name:{
        type:String,
        required:true
    },
    columns:{
        type:[String],
        required:true
        
    },
    date:{ 
        type:Date,
        default:Date.now
    }
});

export default mongoose.model('notetypes',noteTypeSchema);