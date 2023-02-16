const users = require('../models/users');
const user = require('../models/users')
const usersModel = require('../models/users');

const getUsers = (req, res) => {
    usersModel.find()

    .then(users =>{
        res.json(users)
    })
    .catch(err => {
        console.log(err)
        res.send(err)
    })
};

const getUserById = (req, res) => {
    const id = req.params.id
    usersModel.findById(id)

    .then(user => {
        res.status(200).json(user)
    }).catch(err => {
        console.log(err)
        res.status(400).json(err)
    })
};

const postUsers = (req, res) => {
    const user = req.body
    user.createAt = new Date
    usersModel.create(user)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => {
        console.log(err),
        res.status(500).send(err)
    })
};

const updateUserById = (req, res) => {
    const id = req.params.id
    
    const user = req.body

    users.lastUpdateAt = new Date()

    usersModel.findByIdAndUpdate(id, user, {new: true})

    .then (newUser => {
        res.status(200).send(newUser)
    })
    .catch (err => {
        console.log(err)
        res.status(500).send(err)
    })
};

const deleteUserById = (req, res) => {
    const id = req.params.id
    usersModel.findByIdAndDelete(id)
    .then(user => {
        res.status(200).send("Removed Successfully")
    })
    .catch(err => {

        console.log(err)
        res.status(500).send(err)
    })
};


module.exports = {
    getUsers,
    getUserById,
    postUsers,
    updateUserById,
    deleteUserById
}