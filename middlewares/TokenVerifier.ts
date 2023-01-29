import express from 'express';
import jwt from 'jsonwebtoken';

let TokenVerifier=(request:express.Request,response:express.Response,next:express.NextFunction)=>{
    try{
        let token=request.headers['x-auth-token']
        if(!token){
            return response.status(401).json({
                errors:[
                    {
                        msg:'No token provided,Acess denied'
                    }
                ]
            });
        }
        if(typeof token === "string"){
            let decode:any= jwt.verify(token,process.env.JWT_SECRET_KEY);
            request.headers['user']=decode.user;
            next();
        }
    }catch(error){
        response.status(500).json({
            errors:[
                {
                    msg:'Invalid token,access denied'
                }
            ]
        });
    }
};

export default TokenVerifier;