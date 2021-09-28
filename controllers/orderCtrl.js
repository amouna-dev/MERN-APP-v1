const Order = require('../models/order');
require('dotenv').config('../config/.env')



//create order
const addOrder = async(req, res) => {
   try {
   if(req.body.orderItems.length === 0){
       res.status(400).send({msg: "No order items, cart is empty"})
   } 
   const newOrder = new Order({
    orderItems: req.body.orderItems,
    shippingAddress: req.body.shippingAddress,
    paymentMethod: req.body.paymentMethod,
    itemsPrice: req.body.itemsPrice,
    shippingPrice: req.body.shippingPrice,
    taxPrice: req.body.taxPrice,
    totalPrice: req.body.totalPrice,
    user: req.user._id,
    })
    const response = await newOrder.save()
    res.status(200).send({response: response, msg: "Order saved"})
    
    } catch (error) {
        console.log(error)
        res.status(500).send({msg: "Can not save order!"})
    }
}

//Get orders 
const getOrders = async(req, res) => {
    try {
        const orders = await Order.find({})
        if(orders){
            return res.status(200).send({response: orders, msg: "Getting orders with success"})
        }
        return res.status(400).send({msg: "No orders in Database!!"})
    } catch (error) {
        console.log(error)
        return res.status(500).send({msg: "Can not getting orders!!"})
    }
}
//Get order by orderId
const getOrder = async(req, res) => {
    try {
        let findOrder = await Order.findById({_id: req.params.id})
           
        if(findOrder){
            return res.status(200).send({response: findOrder, msg: "Getting order with success"})
        }
         return res.status(400).send({msg: "This order is not Exist!!"})
    } catch (error) {
        console.log(error)
        return res.status(500).send({msg: "Can not get this order!!"})
    }
}

const getSummaryOrder = async(req, res) => {
    try {
        const orders = await Order.find({}).populate('user')
        if(orders){
            return res.status(200).send({response: orders, msg: "Getting orders with success"})
        }
        return res.status(400).send({msg: "No orders in Database!!"})
    } catch (error) {
        console.log(error)
        return res.status(500).send({msg: "Can not getting orders!!"})
    }
}

//delete order
const deleteOrder = async(req, res) => {
    try {
        let result = await Order.findByIdAndDelete({_id: req.params.id})
        if(result){
            return res.status(200).send({msg: "Order deleted", response: result})
        }
        return res.status(400).send({msg: "This order is not exist"})
    } catch (error) {
        console.log(error)
        return res.status(500).send({msg: "Can not delet this order!"})
    }
}

//Update order

// const updatePrice = async (req, res) => {

//     try{
//        let updatedOrder = await Product.findByIdAndUpdate({_id: req.params.id},{$set: {isPaid: true, paidAt: Date.now()}})
//         res.send({ msg: 'Order Paid', response: updatedOrder });  
     
//     } catch(error) {
//       res.status(404).send({ msg: 'Can Not paid this order!!' });
//     }
// }

const updatePayOrder = async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
          id: req.body.id,
          status: req.body.status,
          update_time: req.body.update_time,
          email_address: req.body.email_address,
      }
      const updatedOrder = await order.save();
      
      res.send({ message: 'Order Paid', order: updatedOrder });
    } else {
      res.status(404).send({ msg: 'Order Not Found' });
    }
}


const updateDeliverOrder = async(req, res) => {
    try {
        const order = await Order.findById(req.params.id);
    if (!order){
        res.status(400).send({msg: "No orders "})
    }  
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    res.status(200).send({ msg: "Order delivered", order: updatedOrder });
    } catch (error) {
        res.status(400).send({msg: "Can not delivred order"})
    } 
}

//after deliver client paid cash
const payOrderCash = async(req, res) => {
    try {
        const order = await Order.findById(req.params.id);
  
    if (!order){
        res.status(400).send({msg: "No orders "})
    }  

    order.isPaid = true;
    order.paidAt = Date.now();
  
    const updatedOrder = await order.save();
  
    res.status(200).send({ msg: "Order paid cash", order: updatedOrder });
    } catch (error) {
        res.status(400).send({msg: "Can not paid order"})
    }
    
}


module.exports = {
    addOrder,
    getOrders,
    getOrder,
    updatePayOrder,
    updateDeliverOrder,
    deleteOrder,
    getSummaryOrder,
    payOrderCash
}