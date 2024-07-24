const jwt=require("jsonwebtoken")

const secretKey="my_token"

const generateToken=async(user)=>{
    const payload={
        _id:user.id,
        username:user.username,
        email:user.email,
        role:user.role
    }
    const token=await jwt.sign(payload,secretKey,{expiresIn:'1h'})
    res.cookie('jwt',token)
}

const verifyToken=async(token)=>{
    try{
        const isMatched=await jwt.verify(token,secret)
        return isMatched
    }
    catch (error) {
        console.log("Error verifying token:", error);
        return false;
    }
}

module.exports={generateToken,verifyToken}