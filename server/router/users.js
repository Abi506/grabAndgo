const express=require("express")
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve('./public/uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()} - ${file.originalname}`);
    }
});

const upload = multer({ storage: storage });


const router=express.Router();

//handler goes here actual code
const {handleRegisterUser,handleGetAllUsers,handleGetUserById}=require("../controller/users");
const { handleDeleteFoodById } = require("../controller/food");

router.route('/register')
.post(upload.single('photo'), handleRegisterUser);

router.route('/get-all-users')
.get(handleGetAllUsers)

router.route('/:id')
.get(handleGetUserById)


module.exports=router
