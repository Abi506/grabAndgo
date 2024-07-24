const jwt=require('jsonwebtoken')

const {verifyToken}=require("../auth")

const tokenVerification=async(req,res,next)=>{
    const token = req.cookies["jwt"];
    if(!token){
        res.redirect("/login")
    }
    try{
        const user=await verifyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWJpbmFkaGFuIiwiZW1haWwiOiJhYmkxMjMifQ.lJRWy8P4QD8JxQB4G_-7DzVYvcDXCTDVIzZu4ZeKoes")
        console.log(user,'decrypted the user details')
        req.user=user;
        next()
    }
    catch(error){
        console.log("User given wrong jwt token")
        res.redirect("/login")
    }

}
module.exports=tokenVerification;