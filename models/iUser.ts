import mongoose, {Document} from "mongoose";

export interface iUser extends Document{
    _id?:string;
    name:string;
    email:string;
    password:string;
    avatar:string;
    isAdmin:boolean;
    createdAt?:string;
    updatedAt?:string;
}