const mongoose = require('mongoose')

const { Schema, model } = mongoose

const productSchema = new Schema({
    nameProd : {
        type:String, 
        required: true
    },
    imageProd: {
        type: String,
        required: true
    },
    brand : {
        type:String, 
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0  
    },
    countInStock: {
        type: Number,
        required: true
    },
    reference: {
        type: String,
        default: ""
    },
    color: {
        type: String,
        default: ""
    },
    category: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = model('product', productSchema)