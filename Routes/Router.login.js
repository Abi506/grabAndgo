const express=require('express')
const app=express();
const jwt=require("jsonwebtoken")
const router=express.Router();
const bcrypt=require('bcrypt')

app.use(express.json());

const loginRouter=(data)=>{
    router.post('/',async(request,response)=>{
        const {name,password}=request.body;
        console.log(name,'name and',password,'password here')  
        const isUserExistQuery=`
        SELECT * FROM studentDetails
        WHERE name='${name}' 
        `
        const isUserExist=await data.get(isUserExistQuery);
        if(isUserExist===undefined){
            //user not exist in the database
            response.status(400).send({error_msg:"Invalid User not Exist"})
        }
        else{
            //user is exist
            const isPasswordMatched=await bcrypt.compare(password,isUserExist.password)
            if(isPasswordMatched===true){
                // password matched 
                //sending the name as payload to create the jwt token
                const payload={name:name};
                //creating the jwt token
                const jwtToken=jwt.sign(payload,'my_token')
                //sending the jwt token
                response.send({jwtToken})
            }
            else{ 
                //invalid password. Password is not matched
                response.status(400);
                response.send({error_msg:"Invalid Password"})
            }
        }
    })
    return router
}

module.exports=loginRouter