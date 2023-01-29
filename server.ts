import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userrouter from './router/userrouter';
import eventsrouter from './router/eventsrouter';

const app:express.Application=express();

//cors

app.use(cors());

//config express to receive form data

app.use(express.json());

//configure dotenv file

dotenv.config({path:'./.env'});

const hostName:string|undefined=process.env.HOST_NAME;
const port:string|undefined=process.env.PORT;

//connect to mongodb
let dbURL:string|undefined=process.env.MONGO_DB_LOCAL;
if(dbURL){
    mongoose.connect(dbURL).then((response)=>{
        console.log('connected to mongodb ')
    }).catch((error)=>{
        console.error(error);
        process.exit(1);
    });
}


app.get('/',(request:express.Request,response:express.Response)=>{
    console.log(`<h1>Yo welcome </h1>`);
});

//router configuration

app.use('/users',userrouter);
app.use('/events',eventsrouter);

if(port && hostName)
{
    app.listen(Number(port),hostName,()=>{
        console.log(`server is running at http://${hostName}:${port}`)
    });
};