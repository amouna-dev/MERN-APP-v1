const express = require('express')

const Router = express.Router()
const isAuth = require("../middlewares/isAuth")
const {getUsers, getUserById, updateUser, deleteUser} = require('../controllers/userCtrl')

//private route
Router.get('/', isAuth, (req, res) => {
    res.status(200).send({user: req.user})
})


//Router.use(permission("admin"))

Router.get('/users', isAuth, getUsers)

Router.get('/:id', isAuth, getUserById)
Router.put('/:id', isAuth, updateUser)
Router.delete('/:id', isAuth, deleteUser)


module.exports = Router