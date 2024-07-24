const {Schema,model}=require("mongoose")

const ratingSchema=new Schema({
    foodId:{
        type:Schema.Types.ObjectId,
        ref:'food'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required:true
    },
    averageRating: {
        type: Number,
    },
    comment: {
        type: String,
    },
},{timestamps:true})

const rating=model("rating",ratingSchema)
module.exports=rating