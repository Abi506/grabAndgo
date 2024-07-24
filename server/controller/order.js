const express=require("mongoose")
const order=require("../model/order")
const users=require("../model/users")
const food = require("../model/food")

//new order
const handleCreateOrder=async(req,res)=>{
    const{user,items,totalAmount}=req.body
    try{
        const userOrder=await order.create({
            user:user,
            items:items,
            totalAmount:totalAmount
        })
        await users.findByIdAndUpdate(user, { $inc: { 'analytics.totalOrder': 1 } });
        
        for (const item of items){
            console.log(item,"item in the to update purchase count")
            await food.findByIdAndUpdate(item.foodItem,{$inc:{'purchaseCount':1}})
        }

        res.status(201).send(userOrder)

    }
    catch(error){
        res.status(400).send(`${error.message} Error while creating the order`)
    }
}

//get all order of user based on user id 
const handleGetAllOrdersBasedOUsernId=async(req,res)=>{
    try{
        const orders = await order.find({ user: req.params.userId }).populate('user').populate('items.foodItem');
        if(!orders|| orders.length === 0){
            return res.status(404).send("No orders found for this user")
        }
        res.status(200).send(orders)
    }catch(error){
        res.status(400).send(error.message)
    }
}


//get order by order id
const handleGetOrderById = async (req, res) => {
    try {
      const orders = await order.findById(req.params.orderId).populate('user').populate('items.foodItem');
      if (!orders) {
        return res.status(404).send('Order not found');
      }
      res.send(orders);
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

module.exports={handleGetOrderById,handleGetAllOrdersBasedOUsernId,handleCreateOrder}