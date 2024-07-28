const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/foodImages'));
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Handlers import
const {
    handleGetAllFoodMenus,
    handleUpdateFoodById,
    handleGetFoodById,
    handleGetFoodByCategory,
    handleDeleteFoodById,
    handleAddRatingToFood,
    handleGetTopRatedFood,
    handleAddFood
} = require("../controller/food");

router.route('/')
    .get(handleGetAllFoodMenus)
    .post(upload.single('foodImageUrl'), handleAddFood);

router.route("/top-rated")
    .get(handleGetTopRatedFood)

router.route('/category')
    .get(handleGetFoodByCategory);


router.route('/:foodId')
    .patch(handleUpdateFoodById)
    .delete(handleDeleteFoodById)
    .post(handleAddRatingToFood)
    .get(handleGetFoodById);

module.exports = router;
