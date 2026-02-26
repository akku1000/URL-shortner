import mongoose, { Schema } from "mongoose";

const urlSchema=new Schema({
   longurl:{
    type:String,
    required:true
   },
   shorturl:{
    type:String,
    required:true,
    index:true,
    unique:true
   },
   user:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true   
   },
   clicks:{
    type:Number,
    default:0
   },
    expiresAt:{
        type:Date,
        required:true,
        index: { expires: 0 }
    }
},{
    timestamps:true
})

const Url=mongoose.model("Url",urlSchema);
export default Url;