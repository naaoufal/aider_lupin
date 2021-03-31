require('dotenv').config()
const Products = require('../models/products')

async function all (req, res) {
    try {
        const type = await Type.find()
        res.json(type)
    } catch (error) {
        res.json({message : error.message})
    }
}

async function add (req, res) {
    const type = new Type({
        name : req.body.name,
        image : req.body.image,
        productType : req.body.productType,
        price : req.body.price,
        desc : req.body.desc
    })
    try {
        const newType = await type.save()
        res.json(newType)
    } catch (err) {
        res.json({message : err.message})
    }
}

module.exports = {
    all,
    add
}