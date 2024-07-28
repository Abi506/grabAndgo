const {Schema,model}=require("mongoose")

const foodSchema=new Schema({
    name:{
        type:String,
        required:true 
    },
    description:{
        type:String,
        required:true
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    foodImageUrl: {
        type: String,
    },
    ratings: [
        {
          userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
          },
          rating: {
            type: Number,
          },
          comment: {
            type: String,
          },
        },
    ],
    purchaseCount: {
        type: Number,
        default: 0,
    },

},{timestamps:true})

const food=model("food",foodSchema)
module.exports=food