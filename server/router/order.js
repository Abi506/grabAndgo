const express=require("express")

const router=express.Router()

const {handleGetOrderById,handleGetAllOrdersBasedOUsernId,handleCreateOrder}=require("../controller/order")

router.route("/")
.post(handleCreateOrder)

router.route("/:orderId")
.get(handleGetOrderById)

router.route("/user/:userId")
.get(handleGetAllOrdersBasedOUsernId)


module.exports=router