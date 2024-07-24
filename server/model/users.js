const {Schema,model}=require("mongoose")
const bcrypt=require('bcrypt')

const usersSchema=new Schema({
    username:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowerCase:true
    },
    password:{
        type:String,
        required:true,
        minlength:6,

    },
    phoneNumber:{
        type:String,
        trim:true
    },
    profileImageUrl:{
        type:String
    },
    role:{
        type:String,
        enum:["user",'admin','staff'],
        default:'user'
    },
    analytics:{
        favouriteDishes:[{
            type:Schema.Types.ObjectId,
            ref:"food"
        }],
        totalOrder:{
            type:Number,
            default:0
        }

    }
},{timestamps:true})

usersSchema.pre("save",async function(next){
    const user=this;
    if(user.isModified('password')) {
        try{
        const salt=await bcrypt.genSalt(10);
        user.password=await bcrypt.hash(user.password,salt);
    }
    catch(error){
        return next(error)
    }
    }
    next();
});

const users=model("users",usersSchema);
module.exports=users;