const express=require('express')
const app=express();
const cors=require('cors')
var cookieParser = require('cookie-parser')

app.use(cookieParser())

//mongoDb connection
const connectMongoDb=require("./connection")
connectMongoDb("mongodb+srv://abinandhan:abi123@cluster0.2x76hsn.mongodb.net/grab-and-go")

//auth middleware import
const tokenVerification=require("./middlewares/authMiddleware")



//user router imports here
const userRouter=require("./router/users")
const foodRouter=require("./router/food")
const orderRouter=require("./router/order")

//middlewares imports here
const orderLogs=require("./middlewares/orderLog")
app.use(cors())
app.use(express.json())
const PORT=3001;

//routes path assigned here
app.use('/user',userRouter)
app.use("/food",foodRouter,tokenVerification)

//middlewares
app.use(orderLogs);

app.use('/order',orderRouter)

app.listen(PORT,()=>console.log("Server is running in localhost:3001"))