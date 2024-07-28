const jwt=require('jsonwebtoken')
const secret_key="jwt_id:506"

const verifyToken=async(req,res,next)=>{
    const token=req.header("Authorization") && req.header("Authorization").split(" ")[1];
    if(!token){
        return res.status(500).send({error_msg:"Access Denied. No Token Provided"})
    }
    try{
        const decoded=await jwt.verify(token,secret_key)
        req.user_details=decoded;
        next()
    }
    catch(error){
        res.status(401).json({error_messae:"Invalid Token"})
    }
}

module.exports=verifyToken;