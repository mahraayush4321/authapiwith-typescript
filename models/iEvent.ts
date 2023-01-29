import mongoose from "mongoose";
export interface iEvent extends Document{
    _id?:string;
    name:string;
    image:string;
    price:number;
    date:string;
    info:string;
    type:string;
    createdAt?:string;
    updatedAt?:string;
}