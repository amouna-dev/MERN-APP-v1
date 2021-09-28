const express = require('express')
const connectDB = require('./config/connectDB')
require('dotenv').config('./config/.env')
const cors = require('cors')

const authRouter = require('./Routes/Auth')
const userRouter = require('./Routes/user')
const productRouter = require('./Routes/product')
const orderRouter = require('./Routes/order')



//const path = require('path')
//const publicPath = path.join(__dirname, 'client', 'public')

const app = express()
const port = process.env.PORT || 6000 

connectDB()

app.use(cors())

//middleware
app.use(express.json())

//app.use(express.static(publicPath))

//use routes
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/order', orderRouter)


app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})
app.listen(port, (err) => {
    err?
    console.error(err)
    :
    console.log(`Server is running on port ${port}`)
})