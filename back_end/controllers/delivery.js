require('dotenv').config()
const Delivery = require('../models/delivery')

async function all (req, res) {
    try {
        const delivery = await Delivery.find()
        res.json(delivery)
    } catch (error) {
        res.json({message : error.message})
    }
}

async function add (req, res) {
    const delivery = new Delivery({
        fullname : req.body.fullname,
        email : req.body.email,
        phone : req.body.phone,
        stat : req.body.stat
    })
    try {
        const newDelivery = await admin.save()
        res.json(newDelivery)
    } catch (err) {
        res.json({message : err.message})
    }
}

async function deleteDelivery (req, res) {
    Delivery.findByIdAndDelete(req.params.id).then( () => {
        res.json()
    })
}

module.exports = {
    all,
    add,
    deleteDelivery
}