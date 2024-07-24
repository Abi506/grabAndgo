const {Schema,model}=require("mongoose")

const orderSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    items:[
        {
            foodItem:{
                type:Schema.Types.ObjectId,
                ref:"food",
                required:true
            }
        },
        {
            quantity:{
                type:Number,
                required:true,
                min:1
            }
        },
        {
        price:{
            type:Number,
            required:true
        }
     },
    ],
    totalAmount:{
        type:Number,
        required:true
    },
    orderAt:{
        type:Date,
        default:Date.now
    }
})

const order=model('order',orderSchema)
module.exports=order;