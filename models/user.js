const mongoose = require('mongoose')

const { Schema, model } = mongoose

const userSchema = new Schema({
    firstName : {
        type:String, 
        required: true,
    },
    lastName : {
        type:String, 
        required: true
    },
    email: {
        type:String, 
        required:true,
        trim: true,
        unique: true
    },
    password: {
        type:String, 
        required:true
    },
    address: {
        type:String, 
        required:true
    },
    phone: {
        type: String,
        required:true
    },
    role: {
        type: String,
        default: "user",
    },
    orders: {
        type: Array,
        default: []
    }
})

module.exports = model('user', userSchema)