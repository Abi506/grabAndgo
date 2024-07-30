const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

app.use(cookieParser());

// MongoDB connection
const connectMongoDb = require("./connection");
connectMongoDb("mongodb+srv://abinandhan:abi123@cluster0.2x76hsn.mongodb.net/grab-and-go");

// Auth middleware token verification
const tokenVerification = require("./middlewares/authMiddleware");

// Routers import
const userRouter = require("./router/users");
const foodRouter = require("./router/food");
const orderRouter = require("./router/order");

// Middlewares import
const orderLogs = require("./middlewares/orderLog");

app.use(cors());
app.use(express.json());
const PORT = 3001;

app.use(express.static(path.resolve('./public')));

// Routes path assigned here
app.use('/user',userRouter);
app.use("/food",tokenVerification,foodRouter);

// Middlewares
app.use(orderLogs);

app.use('/order', tokenVerification,orderRouter);

app.listen(PORT, () => console.log(`Server is running on localhost:${PORT}`));
