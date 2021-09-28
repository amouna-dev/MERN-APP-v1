const express = require('express');

const Router = express.Router();
const Order = require('../models/order')
const isAuth = require("../middlewares/isAuth")
const authAdmin = require("../middlewares/authAdmin")
const {addOrder, getOrders, getOrder, updatePayOrder, updateDeliverOrder, deleteOrder, getSummaryOrder, payOrderCash} = require("../controllers/orderCtrl");

//Get orders of users
Router.get('/', isAuth, getOrders);
//Get orders by id - user orders
Router.get('/myorder', isAuth, async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    if(orders) return res.status(200).send({response:orders, msg: "Getting Your orders with success"});
    else return res.status(400).send({msg: "No orders !!"})
  })
//checkout
//Router.post('/:id', isAuth, checkout)
Router.post('/', isAuth, addOrder)

Router.get('/:id', isAuth, getOrder);
Router.put('/:id/pay', isAuth, updatePayOrder);
Router.put('/:id/deliver', isAuth, updateDeliverOrder);
Router.put('/:id/paycash', isAuth, payOrderCash);
Router.get('/orderlist', isAuth, getSummaryOrder)
Router.delete('/:id', isAuth, deleteOrder);


module.exports = Router;