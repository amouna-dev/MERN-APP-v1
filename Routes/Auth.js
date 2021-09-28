const Router = require('express').Router()
const bcrypt = require('bcrypt')
require('dotenv').config('../config/.env')
const User = require('../models/user')
const {validator, RegisterRules, loginRules} = require('../middlewares/validator')
const jwt = require('jsonwebtoken')
//const isAuth = require('../middlewares/isAuth')

Router.post('/register', RegisterRules(), validator, async(req, res) => {
    const { firstName, lastName, email, password, address, phone } = req.body
    try {
        //simple validation
        // if(!firstName || !lastName || !email || !password || !address || !phone){
        //     return res.status(400).send({msg: 'Please enter all fields'})
        // }
        //check existing email
        let user = await User.findOne({email})
        if(user){
            return res.status(400).send({msg: 'This Email already exist!'})
        }
        //check password's length
        if(password.length < 4){
            return res.status(400).send({msg: 'Password must be 4 characters at least!!'})
        }
        //Hash password
        const passwordHash = await bcrypt.hash(password, 10)
        //create new user
        user = new User({firstName, lastName, email, password: passwordHash, address, phone})
        
        //save user
        await user.save()

        //register payload : your access token
        const payload = {
            id: user._id
        }
        const token = await jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
        res.status(200).send({msg: 'Register Success!', user, token})
    
    } catch (error) {
        return res.status(500).send({msg: `Register Server Error: ${error}`})
    }
})
//login
Router.post('/login', loginRules(), validator, async(req, res) =>{
    const { email, password } = req.body
    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).send({msg: 'This email does not exist!'})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).send({msg: 'Password is incorrect'})
        }
        //token
        const payload = {
            id: user._id,
            firstName: user.firstName
        }
        const token = await jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
        res.send({msg: 'Login Success!', user, token})

    } catch (err) {
        return res.status(500).send({msg: err.message})
    }    
} )


//private routes
// Router.get('/user', isAuth, (req, res) => {
//     res.status(200).send({user:req.user})
 //})

module.exports = Router;