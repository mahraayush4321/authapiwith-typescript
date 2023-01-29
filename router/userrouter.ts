import express from 'express';
import {body,validationResult} from 'express-validator';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import  jwt  from 'jsonwebtoken';
import gravatar from 'gravatar'
import TokenVerifier from '../middlewares/TokenVerifier';

const userrouter:express.Router=express.Router();

//register user
//method:post
//fields:name,email,password
//acess:public


userrouter.post('/register',[
    body('name').not().isEmpty().withMessage('Name is required'),
    body('email').not().isEmpty().withMessage('email is required'),
    body('password').not().isEmpty().withMessage('password is required'),
],async(request:express.Request,response:express.Response)=>{
    let errors=validationResult(request);
    if(!errors.isEmpty()){
        return response.status(400).json({
            errors:errors.array()
        });
    }
   try{
        let{name,email,password}=request.body;
        //register logic

        //check if email exist or not 
            let user:any|null=await User.findOne({
                email:email
            });
            if(user){
                return response.status(400).json({
                    errors:[
                        {
                            msg:'user already exists'
                        }
                    ]
                });
            }

        //encrypt the password
            let salt=await bcrypt.genSalt(10);
            password=await bcrypt.hash(password,salt);

        //get avatar url

            let avatar = gravatar.url(email,{
                s:'300',
                r:'pg',
                d:'mm'
            })

        //register the user

        user = new User({name,email,password,avatar});
        user=await user.save();

        response.status(200).json({
            msg:'register is success'
        });
   }catch(error){
        console.error(error);
        response.status(500).json({
            errors:[
                {
                    msg:error
                }
            ]
        });
   }
});

//login user
//method:post
//fields:email,password
//acess:public


userrouter.post('/login',[
    body('email').not().isEmpty().withMessage('Email is required'),
    body('password').not().isEmpty().withMessage('password is required'),
],async(request:express.Request,response:express.Response)=>{
    let errors=validationResult(request);
    if(!errors.isEmpty()){
        return response.status(400).json({
            errors:errors.array()
        });
    }
    try{
         let{email,password}=request.body;
         //login logic

        //check for email
        let user:any|null =await User.findOne({email:email});

        if(!user){
            return response.status(401).json({
                errors:[
                    {
                        msg:'invalid email'
                    }
                ]
            });
        }

        //check for password

        let isMatch:Boolean=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return response.status(401).json({
                errors:[
                    {
                        msg:'invalid password'
                    }
                ]
            });
        }


        //create a token and send

        let payload:any={
            user:{
                id:user.id,
                name:user.name,
            }
        };
        let secretKey:string|undefined=process.env.JWT_SECRET_KEY;
        if(secretKey){
            let token=await jwt.sign(payload,secretKey);
            response.status(200).json({
                msg:'login successfully',
                token:token
            })
        }

    }catch(error){
         console.error(error);
         response.status(500).json({
             errors:[
                 {
                     msg:error
                 }
             ]
         });
    }
 });


 //get user
//method:get
//fields:no-feilds
//acess:private


userrouter.get('/me',TokenVerifier,async(request:express.Request,response:express.Response)=>{
    try{
         
         //get userlogic
         let requestedUser:any=request.headers['users'];
         let user:any|null=await User.findById(requestedUser.id);
         if(!user){
            response.status(400).json({
                errors:[
                    {
                        msg:'user data not found'
                    }
                ]
                
            });
         }
         response.status(200).json({
            user:user
         });
       
    }catch(error){
         console.error(error);
         response.status(500).json({
             errors:[
                 {
                     msg:error
                 }
             ]
         });
    }
 });


export default userrouter;