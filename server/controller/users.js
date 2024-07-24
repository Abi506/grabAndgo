const express=require("mongoose")
const users=require("../model/users")

const handleRegisterUser=async(req,res)=>{
    console.log(req.body)
    try{
    await users.create({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        phoneNumber:req.body.phoneNumber,
        profileImageUrl:req.file?req.file.filename:null
    })
    res.status(201).send("User created Successfully")
    }
    catch(error){
        console.log(error.message,'Error message while registering the user')
        res.status(500).send(`Error while creating the user ${error.message}`)
    }

}

const handleGetAllUsers=async(req,res)=>{
    try{
        const allUsers=await users.find()
        res.status(201).send(allUsers)
        }
        catch(error){
            console.log(error.message,'Error while getting all users')
            res.status(500).send(`Error while getting the all users ${error.message}`)
        }
}

const handleGetUserById=async(req,res)=>{
    try{
        const user=await users.findById(req.params.id)
        res.status(201).send(user)
        }
        catch(error){
            console.log(error.message,'Error while getting  user')
            res.status(500).send(`Error while getting the user ${error.message}`)
        }
}

module.exports={handleRegisterUser,handleGetAllUsers,handleGetUserById}
