const express=require("mongoose")
const food=require("../model/food")
const rating=require("../model/ratings")
const {getFoodWithAverageRating}=require("./services/ratingServices")

//add food to the menu
const handleAddFood=async(req,res)=>{
    try {
        const foodItem = await food.create({
            name:req.body.name,
            description:req.body.description,
            category:req.body.category,
            price:req.body.price
        })
        
        res.status(201).send(foodItem);
      } catch (error) {
        res.status(400).send(error.message);
      }
    
}

//get all food menu
const handleGetAllFoodMenus = async (req, res) => {
    const { search } = req.query;
    console.log(search, 'name');
    
    try {
        let allFood;
        
        if (search) {
            const sanitizedSearch = search.replace(/"/g, '');
            allFood = await food.find({ name: new RegExp(sanitizedSearch, "i") });
            console.log(allFood,'all food')
        } else {
            allFood = await food.find();
        }
        
        res.status(200).json(allFood);
    } catch (error) {
        console.error('Error while getting allFood:', error.message);
        res.status(500).send(`Error while getting the allFood: ${error.message}`);
    }
}

//get a food by id
const handleGetFoodById=async(req,res)=>{
    try{
        const food=await food.findById(req.params.id)
        res.status(201).send(food)
        }
        catch(error){
            console.log(error.message,'Error while getting food')
            res.status(500).send(`Error while getting the food ${error.message}`)
        }
}

//update food by id
const handleUpdateFoodById=async(req,res)=>{
    //the Object keys will extract the name of the keys from the req.body
    const updates=Object.keys(req.body);

    const allowedUpdates=["price","quantity"]

    //checking the updation will happen with only the allowed updates like price or quantity
    const isValidOperation=updates.every(update=>allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error:"Invalid Updates!"});
    }

    try{
        const foodItem=await food.findById(req.params.id);
        //if food is not there
        if(!foodItem){
            return res.send("Food Item is not found")
        }

        // Apply the updates to the food item
        updates.forEach(update => foodItem[update] = req.body[update]);

        // Save the updated food item
        await foodItem.save();
    
        // Respond with the updated food item
        res.status(200).send(foodItem);
    }
    catch(error){
         // Handle any errors and respond with an error message
         res.status(400).send(error.message);
    }
}

//get food by category
const handleGetFoodByCategory=async(req,res)=>{
    try {
        const foodItems = await food.find({ category: req.params.category });
        res.status(200).send(foodItems);
      } catch (error) {
        res.status(500).send(error.message);
      }   
}

//delete food by id
const handleDeleteFoodById=async (req, res) => {
    try {
      const foodItem = await food.findByIdAndDelete(req.params.id);
      if (!foodItem) {
        return res.status(404).send('Food item not found');
      }
      res.status(200).send('Food item deleted');
    } catch (error) {
      res.status(500).send(error.message);
    }
};

//add rating to food  based on the food id
const handleAddRatingToFood=async(req,res)=>{
    try{
        const { foodrating, userId, comment } = req.body;
        const foodId = req.params.foodId;

        const foodItemRating = await food.findById(foodId);
        if(!foodItemRating){
            return res.status(404).send('Food item not found');
        }

        const newRating=await rating.create({
            rating:foodrating,
            foodId,
            userId,
            comment:comment||" "

        })
        let get=getFoodWithAverageRating(foodId)
        console.log(get,'get')

        res.status(200).send(newRating)
    }
    catch (error) {
        res.status(400).send(`${error.message} error while adding rating to food`);
      }
}

module.exports={handleGetAllFoodMenus,handleUpdateFoodById,handleGetFoodById,handleGetFoodByCategory,handleDeleteFoodById,handleAddRatingToFood,handleAddFood}