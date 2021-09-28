const mongoose = require('mongoose')
require('dotenv').config({path:'./config/.env'})

const DB_URI = process.env.DB_URI
//const DB_URI = 'mongodb://localhost:27017/usersDB'

const connectDB = async() => {
    try {
        await mongoose.connect(DB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true })
            console.log("Connection to DB with success")
    } catch (error) {
      console.log( `cannot connect to database ${error}`)  
    }
}

module.exports = connectDB