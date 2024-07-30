const mongoose = require("mongoose");
const users = require("../model/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleRegisterUser = async (req, res) => {
  console.log(req.body);
  try {
    await users.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      phoneNumber: req.body.phoneNumber,
      profileImageUrl: req.file ? req.file.filename : null,
    });
    res.status(201).send("User created Successfully");
  } catch (error) {
    console.log(error.message, "Error message while registering the user");
    res.status(500).json({ error_msg: error.message });
  }
};

const secret_key="jwt_id:506"

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const findUserDetails = await users.findOne({ username });
    console.log(findUserDetails, "userdetails");

    if (findUserDetails) {
      // Check if the password is a string and not undefined
      if (typeof password === "string" && typeof findUserDetails.password === "string") {
        const isPasswordMatch = await bcrypt.compare(password, findUserDetails.password);

        if (isPasswordMatch) {
          const payload = {
            userId: findUserDetails._id,
            username: findUserDetails.username,
            email: findUserDetails.email,
            phoneNumber: findUserDetails.phoneNumber,
            role: findUserDetails.role,
          };
          const token = jwt.sign(payload, secret_key, { expiresIn: "1h" });

          res.cookie("jwt_id", token); // Set the cookie with the JWT token
          res.status(200).json({ msg: "Login successful", token }); // Send response message and token
        } else {
          // Password not matched
          res.status(401).json({ error_msg: "Enter correct password" });
        }
      } else {
        // Password is not a string or undefined
        res.status(400).json({ error_msg: "Invalid password format" });
      }
    } else {
      // Username not found
      res.status(404).json({ error_msg: "Username not exist" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error_msg: "Internal server error" });
  }
};

const handleGetAllUsers = async (req, res) => {
  try {
    const allUsers = await users.find();
    res.status(200).send(allUsers);
  } catch (error) {
    console.log(error.message, "Error while getting all users");
    res.status(500).send(`Error while getting all users ${error.message}`);
  }
};

const handleGetUserById = async (req, res) => {
  try {
    const user = await users.findById(req.params.id);
    res.status(200).send(user);
  } catch (error) {
    console.log(error.message, "Error while getting user");
    res.status(500).send(`Error while getting the user ${error.message}`);
  }
};

const handleGetUserProfileDetails=async(req,res)=>{
  const userdetails=req.user_details
  console.log(userdetails,'userDetails from the profile')
  try{
  const userDetailsFromDatabase=await users.findById(userdetails.userId)
  console.log(userDetailsFromDatabase,'user details from database')
  res.status(200).send(userDetailsFromDatabase)
}
catch(error){
  console.log(error.message)
  res.status(500).send(error.message)
}
}



module.exports = { handleRegisterUser, handleGetAllUsers, handleGetUserById, handleLogin,handleGetUserProfileDetails };
