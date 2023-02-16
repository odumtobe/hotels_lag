//const hotels = require('../models/hotels')
const hotelsModel = require('../models/hotels')

const getHotels = (req, res) => {
    hotelsModel.find()

    .then(hotels =>{
        res.json(hotels)
    })
    .catch(err => {
        console.log(err)
        res.send(err)
    })
};

const getHotelById = (req, res) => {
    const id = req.params.id
    hotelsModel.findById(id)

    .then(hotel => {
        res.status(200).json(hotel)
    }).catch(err => {
        console.log(err)
        res.status(400).json(err)
    })
};

const postHotel = (req, res) => {
    const hotel = req.body
    hotel.createAt = new Date()
    hotelsModel.create(hotel)
    .then(hotel => {
        res.status(200).json(hotel)
    })
    .catch(err => {
        console.log(err),
        res.status(500).send(err)
    })
};

const updateHotelById = (req, res) => {
    const id = req.params.id
    
    const hotel = req.body

    hotel.lastUpdateAt = new Date()

    hotelsModel.findByIdAndUpdate(id, hotel, {new: true})

    .then (newHotel => {
        res.status(200).send(newHotel)
    })
    .catch (eer => {
        console.log(err)
        res.status(500).send(err)
    })
};

const deleteHotelById = (req, res) => {
    const id = req.params.id
    hotelsModel.findByIdAndDelete(id)
    .then(hotel => {
        res.status(200).send("Removed Successfully")
    })
    .catch(err => {

        console.log(err)
        res.status(500).send(err)
    })
};


module.exports = {
    getHotels,
    getHotelById,
    postHotel,
    updateHotelById,
    deleteHotelById
}