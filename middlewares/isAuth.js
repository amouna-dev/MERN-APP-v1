const jwt = require('jsonwebtoken')

const User = require('../models/user')

require('dotenv').config({path: '../config/.env'})


const isAuth = async(req, res, next) =>{
    try {
        const token = req.headers['auth-token']
        if(!token){
            return res.status(400).send({msg: 'Invalid Authentication: Dont have a Token!!'})
        }
        const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        
        //check id 
        const user = await User.findById(decoded.id)

        if(!user){
            return res.status(400).send({msg: 'Invalid Authentication!'})
        }
        //get user
        req.user = user
        next()
    } catch (err) {
        return res.status(400).send({msg: 'Token is not valid'})
    }
}



// const permission = (role) => (req, res, next) => {
//      try {
//         if (role !== req.user.role){
//              return res.status(400).send({msg: 'You dont have access to this resource'})
//         }
//         next();
        
//      } catch (error) {
//         return res.status(400).send({msg: 'You dont have permission'})
//      }  
//   };

module.exports = isAuth;