import express from 'express';

const eventsrouter:express.Router=express.Router();

//upload event
//method:post
//fields:name,image,price,date,info,type
//acess:private


eventsrouter.post('/upload',async(request:express.Request,response:express.Response)=>{
    try{
         let{name,image,price,date,info,type}=request.body;
         //upload events logic
         response.status(200).json({
             msg:'upload events'
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
 })


 //get free event
//method:get
//fields:no-fields
//acess:public


eventsrouter.get('/free',async(request:express.Request,response:express.Response)=>{
    try{
         //upload events logic
         response.status(200).json({
             msg:'free events'
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


 //get pro event
//method:get
//fields:no-fields
//acess:public


eventsrouter.get('/pro',async(request:express.Request,response:express.Response)=>{
    try{
         //get pro  events logic
         response.status(200).json({
             msg:'pro events'
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

 //get single event based on id
//method:get
//fields:no-fields
//acess:public


eventsrouter.get('/:eventId',async(request:express.Request,response:express.Response)=>{
    try{
        let {eventId}=request.params
         //single event logic
         response.status(200).json({
             msg:'single  events'
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

eventsrouter.get('/',(request:express.Request,response:express.Response)=>{
        response.status(200).json({
            msg:'from events router'
        });
});

export default eventsrouter;