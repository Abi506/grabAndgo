const express=require("mongoose")
const food=require("../model/food")
const rating=require("../model/ratings")

//add food to the menu
const handleAddFood=async(req,res)=>{
    try {
        const foodItem = await food.create({
            name:req.body.name,
            description:req.body.description,
            category:req.body.category,
            price:req.body.price,
            foodImageUrl:req.file?req.file.filename:null
        })
        
        res.status(201).send(foodItem);
      } catch (error) {
        res.status(400).send(error.message);
      }
    
}

//get all food menu
const handleGetAllFoodMenus = async (req, res) => {
    const { search, sort, priceRange, isPureVeg, skip } = req.query;
    console.log(search, 'name');

    try {
        let pipeline = [];

        // Search filter
        if (search) {
            const sanitizedSearch = search.replace(/"/g, '');
            pipeline.push({
                $match: {
                    name: new RegExp(sanitizedSearch, "i")
                }
            });
        }

        // Pure veg filter
        if (isPureVeg === 'true') {
            pipeline.push({
                $match: {
                    category: "Veg"
                }
            });
        }

        // Price range filter
        if (priceRange === 'less_than_100') {
            pipeline.push({
                $match: {
                    price: { $lt: 100 }
                }
            });
        } else if (priceRange === '100_to_200') {
            pipeline.push({
                $match: {
                    price: { $gte: 100, $lte: 200 }
                }
            });
        }

        // Sorting
        if (sort) {
            if (sort === 'low_to_high') {
                pipeline.push({ $sort: { price: 1 } });
            } else if (sort === 'high_to_low') {
                pipeline.push({ $sort: { price: -1 } });
            }
        }

        // Skip items
        if (skip) {
            pipeline.push({ $skip: parseInt(skip) });
        }

        let allFood;
        if (pipeline.length > 0) {
            // Aggregation query execution
            allFood = await food.aggregate(pipeline);
        } else {
            // No filters or sorting, get all food items
            allFood = await food.find();
        }

        res.status(200).json(allFood);
    } catch (error) {
        console.error('Error while getting allFood:', error.message);
        res.status(500).send(`Error while getting the allFood: ${error.message}`);
    }
};

//get a food by id
const handleGetFoodById=async(req,res)=>{
    const food_id=req.params.foodId
    try{
        console.log(food_id,'food id')
        const getFoodById=await food.findById(food_id)
        console.log(getFoodById,'get food by id')
        res.send(getFoodById)
    }
    catch(error){
        console.log(error.message)
        res.send({error_msg:error.message})
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

//get top rated food
const handleGetTopRatedFood=async(req,res)=>{
    try{
        const foodItems=await food.find({})
        res.send(foodItems)
    }
    catch(error){
        res.status(500).send(error.message)
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

module.exports={handleGetAllFoodMenus,handleGetTopRatedFood,handleUpdateFoodById,handleGetFoodById,handleGetFoodByCategory,handleDeleteFoodById,handleAddRatingToFood,handleAddFood}