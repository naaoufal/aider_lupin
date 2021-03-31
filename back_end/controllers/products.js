require('dotenv').config()
const Products = require('../models/products')

async function all (req, res) {
    try {
        const product = await Products.find()
        res.json(product)
    } catch (error) {
        res.json({message : error.message})
    }
}

async function add (req, res) {
    const product = new Products({
        name : req.body.name,
        image : req.file[0].image,
        productType : req.body.productType,
        price : req.body.price,
        desc : req.body.desc
    })
    try {
        const newProduct = await product.save()
        res.json(newProduct)
    } catch (err) {
        res.json({message : err.message})
    }
}

module.exports = {
    all,
    add
}