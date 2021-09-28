const User = require("../models/user")


//get all users
const getUsers = async(req, res) => {
    try {
       const users = await  User.find()
        res.status(200).send({response: users, msg: "Getting all users with success"})
    } catch (error) {
        res.status(500).send({msg: "Can not getting users!"})
    }
}

//get user by id
const getUserById = async(req, res) => {
    try {
        const user = await User.findById({_id: req.params.id})
        if(! user){
           return res.status(400).send({msg: "This user does not exist!"})
        }
        return res.status(200).send({msg: "User exist", response: user})
    } catch (error) {
        return res.status(400).send({msg: "Can not get user with this id, Check id..."})
    }
}

//add new user
// const createUser = async(req, res) => {
//     try {
//       const newUser = await User.create(req.body);  
//       return res.status(200).send({ msg: "creation user with success", data: newUser });
//     } catch (error) {
//         return res.status(500).send({ msg: "Can not create user!!"}); 
//     }
// }


//put user
const updateUser = async(req, res) => {
    try {
        const user = await User.findByIdAndUpdate({_id: req.params.id},{$set: {...req.body}})
        if(user) {
           return res.status(200).send({msg: "User modified", response: user})
        }
        return res.status(400).send({msg: "This user is not exist"})
        
    } catch (error) {
        return res.status(500).send({msg: "Can not update this user!!"})
    }
}


//remove user
const deleteUser = async(req, res) => {
    try {
        const user = await User.findByIdAndDelete({_id: req.params.id})
        if(!user) {
            return res.status(400).send({msg: "This user is not exist"})
        }
        return res.status(200).send({msg: "User deleted"})
    } catch (error) {
        return res.status(500).send({msg: "Can not delete this user!!"})
    }
}

module.exports = {
    getUsers,
    getUserById,
    updateUser,
    deleteUser
  };
  