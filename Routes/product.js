const express = require('express');
const Router = express.Router();

const productCtrl = require('../controllers/productCtrl');
const  isAuth  = require("../middlewares/isAuth");
//const Product = require('../models/product');

Router.post('/add', isAuth, productCtrl.addProduct);

Router.get('/', productCtrl.getProducts);

Router.get('/:id', productCtrl.getProduct);

Router.put('/:id', isAuth, productCtrl.updateProduct);

Router.delete('/:id', isAuth, productCtrl.deleteProduct);


module.exports = Router;