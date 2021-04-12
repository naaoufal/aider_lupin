require('dotenv').config()
const FireSale = require('../models/firesale')

async function all (req, res) {
    try {
        const firesale = await FireSale.find()
        res.json(firesale)
    } catch (error) {
        res.json({message : error.message})
    }
}

async function add (req, res) {
    const firesale = new FireSale({
        name : req.body.name,
        image : req.body.image,
        price : req.body.price,
        desc : req.body.desc,
        idSeller : req.body.idSeller
    })
    try {
        const newFiresale = await firesale.save()
        res.json(newFiresale)
    } catch (err) {
        res.json({message : err.message})
    }
}

async function deleteOne (req, res) {
    FireSale.findByIdAndDelete(req.params.id).then( () => {
        res.json()
    })
}

module.exports = {
    all,
    add,
    deleteOne
}