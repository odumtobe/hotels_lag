const express = require('express')

const {
   getHotels,
   getHotelById,
   postHotel,
   updateHotelById,
   deleteHotelById
} = require ('../controllers/hotels')

const hotelRouter = express.Router()

hotelRouter.get("/", getHotels);
hotelRouter.get("/:id", getHotelById)
hotelRouter.post("/", postHotel)
hotelRouter.delete("/:id",deleteHotelById)
hotelRouter.patch("/:id", updateHotelById)

module.exports = hotelRouter