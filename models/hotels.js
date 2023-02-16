const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const hotelSchema = new Schema ({
    name: {
        type: String,
        required: true
    },

    num_Rooms: {
        type: String,
        required: true,
    },

    lounge: {
        type: Boolean,
        required: true,
    },

    restaurants: {
        type: String,
        required: true,
    },

    swimming_Pool: {
        type: Boolean,
        required: true,
    }
});

module.exports = mongoose.model('hotels', hotelSchema)