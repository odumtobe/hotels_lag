const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    userName: {
        type: String,
        required: true,
        required: ['userName should consist of letters and characters'] 
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    img: {
        type: String,
        required: true
    }
})


userSchema.pre('save', function(next) {
    if(this.password) {
        const salt = bcrypt.genSaltSync(10)
        this.password = bcrypt.hashSync(this.password, salt)
    }
    next()
});

module.exports = mongoose.model('users', userSchema)