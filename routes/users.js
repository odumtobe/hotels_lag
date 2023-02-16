 const express = require('express')

 const {
    getUsers,
    getUserById,
    postUsers,
    updateUserById,
    deleteUserById
} = require ('../controllers/users')

const userRouter = express.Router()

userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById)
userRouter.post("/", postUsers)
userRouter.delete("/:id",deleteUserById)
userRouter.patch("/:id", updateUserById)

module.exports = userRouter