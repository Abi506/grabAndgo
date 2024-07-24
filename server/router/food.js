const express=require("express")

const router=express.Router();

//handler goes here actual code
const {handleGetAllFoodMenus,handleUpdateFoodById,handleGetFoodById,handleGetFoodByCategory,handleDeleteFoodById,handleAddRatingToFood,handleAddFood}=require("../controller/food");


router.route('/')
.get(handleGetAllFoodMenus)
.post(handleAddFood)

router.route("/category")
.get(handleGetFoodByCategory)

router.route('/:foodId')
.patch(handleUpdateFoodById)
.delete(handleDeleteFoodById)
.post(handleAddRatingToFood)
.get(handleGetFoodById)

module.exports=router