const express=require("express")
const multer = require("multer");
const path = require("path");
const tokenVerification=require("../middlewares/authMiddleware")

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
const {handleRegisterUser,handleGetAllUsers,handleGetUserById,handleLogin}=require("../controller/users");
const { handleDeleteFoodById } = require("../controller/food");

router.route('/register')
.post(upload.single('photo'), handleRegisterUser);

router.route("/login")
.post(handleLogin)

router.route('/get-all-users')
.get(tokenVerification,handleGetAllUsers)

router.route('/:id')
.get(tokenVerification,handleGetUserById)


module.exports=router
