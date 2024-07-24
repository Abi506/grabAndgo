const mongoose=require("mongoose")

const connectMongoDb=async(url)=>{
    await mongoose.connect(url)
    .then(()=>console.log("MongoDb connected successfully"))
    .catch(error=>console.log(error.message,"Error while connecting MongoDb"))
}
module.exports=connectMongoDb
