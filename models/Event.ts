import mongoose,{Schema,Model} from "mongoose";
import { iEvent } from "./iEvent";

let eventSchema:Schema=new mongoose.Schema({
    name:{type:String,required:true},
    image:{type:String,required:true},
    price:{type:Number,required:true},
    date:{type:String,required:true},
    info:{type:String,required:true},
    type:{type:String,required:true},
},{timestamps:true});

let Event:Model<any>=mongoose.model('event',eventSchema);
export default Event;
