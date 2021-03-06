require('dotenv').config()
const Products = require('../models/products')

// search for all products to render it in buyer page
async function all (req, res) {
    try {
        const product = await Products.find()
        res.json(product)
    } catch (error) {
        res.json({message : error.message})
    }
}

// search for all products of the same seller
async function allBySeller (req, res) {
    try {
        const product = await Products.find({
            idSeller : req.params.idSeller
        })
        res.json(product)
    } catch (error) {
        res.json({message : error.message})
    }
}

// show random products for fire sale
async function randomOne (req, res) {
    try {
        const product = await Products.aggregate([{ $sample: { size: 1 } }])
        res.json(product)
    } catch (error) {
        res.json({message : error.message})
    }
}

// search for product with id
async function oneProduct (req, res, next) {
    let product
    try {
        product = await Products.findById(req.params.id);
        res.json(product)
    } catch (error) {
        return res.json({message : error.message})
    }
    res.product = product
    next()
}

async function add (req, res) {
    const product = new Products({
        name : req.body.name,
        image : req.file.filename,
        productType : req.body.productType,
        price : req.body.price,
        desc : req.body.desc,
        idSeller : req.body.idSeller
    })
    try {
        const newProduct = await product.save()
        res.json(newProduct)
    } catch (err) {
        res.json({message : err.message})
    }
}

async function deleteOne (req, res) {
    Products.findByIdAndDelete(req.params.id).then( () => {
        res.json()
    })
}

module.exports = {
    all,
    allBySeller,
    oneProduct,
    add,
    deleteOne,
    randomOne
}