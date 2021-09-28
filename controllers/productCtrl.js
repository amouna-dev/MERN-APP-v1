const Product = require("../models/product");

// Create product
const addProduct = async(req, res) => {
    const { nameProd, imageProd, brand, price, rating, countInStock, description, category, color, reference} = req.body
    try {
       if(!nameProd || !imageProd || !brand || !price || !rating || !countInStock || !description || !category){
           res.status(400).send({msg: "Please enter all fields !"})
       }
        const newProduct = new Product({ nameProd, imageProd, brand, price, rating, countInStock, description, color, reference, category});
        
        const response = await newProduct.save()
        res.status(200).send({response: response, msg: "Product saved"})

    } catch (error) {
        console.log(error)
        res.status(500).send({msg: "Can not save product!"})
    }
}

//Get products
const getProducts = async(req, res) => {
    try {
        let products = await Product.find()
        if(products){
            return res.status(200).send({response: products, msg: "Getting all products with success"})
        }
         return res.status(400).send({msg: "No products in Database!!"})
    } catch (error) {
        console.log(error)
        return res.status(500).send({msg: "Can not getting products!!"})
    }
}

//Get product by id
const getProduct = async(req, res) => {
    try {
        let products = await Product.findById({_id: req.params.id})
        if(products){
            return res.status(200).send({response: products, msg: "Getting product with success"})
        }
         return res.status(400).send({msg: "This product is not Exist!!"})
    } catch (error) {
        console.log(error)
        return res.status(500).send({msg: "Can not get this product!!"})
    }
}

//Update product
const updateProduct = async(req, res) => {
    try {
        let product = await Product.findByIdAndUpdate({_id: req.params.id},{$set: {...req.body}})
        if(product){
            return res.status(200).send({msg: "Product updated", response: product})
        }
        return res.status(400).send({msg: "This product is not exist"})
    } catch (error) {
        console.log(error)
        return res.status(500).send({msg: "Can not updating product!"})
    }
}

//delete product
const deleteProduct = async(req, res) => {
    try {
        let product = await Product.findByIdAndDelete({_id: req.params.id})
        if(product){
            return res.status(200).send({msg: "Product deleted", response: product})
        }
        return res.status(400).send({msg: "This product is not exist"})
    } catch (error) {
        console.log(error)
        return res.status(500).send({msg: "Can not delet this product!"})
    }
}

module.exports = {
    addProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
}