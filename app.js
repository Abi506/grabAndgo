const express=require('express')
const app=express()

const cors=require('cors')

const path=require('path')
const {open}=require('sqlite')
const sqlite3=require('sqlite3')

const bcrypt=require("bcrypt")
const jwt=require('jsonwebtoken');


const registerRouter=require("./Routes/Router.register.js") //register router
const loginRouter=require('./Routes/Router.login.js') //login router
const  foodRouter=require('./Routes/Router.food.js') // food menu router

app.use(cors());
app.use(express.json());


let dbPath=path.join(__dirname,"grabAndgo.db")

const authenticateToken=(request,response,next)=>{
    const authHeader=request.headers['authorization'];
    const token=authHeader && authHeader.split(" ")[1];
    if(!token){
        response.status(401).send("Jwt Token is not there");
    }
    else{
        jwt.verify(token,'my_token',async(error,payload)=>{
            console.log(payload,'payload of the user')
        
        if(error){
            response.status(400).send("Invalid Jwt Token")
        }
        else{
            request.name=payload.name
            next();
        }
    })
    }
}

const initalizaDatabaseAndServer=async()=>{
    try{
       const data=await open({
            filename:dbPath,
            driver:sqlite3.Database
        });

        //Routes
        app.use('/register',registerRouter(data)); //register router
        app.use('/login',loginRouter(data)); //login router
        app.use("/menu",authenticateToken,foodRouter(data)) //menu router

        app.listen(3001,()=>{
            console.log(`Server running at ${dbPath}`);
        })
    }
    catch(error){
        console.log(`Database Error ${error.message}`)
    }
}

initalizaDatabaseAndServer()





