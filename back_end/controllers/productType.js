const Type = require('../models/productType')

 
async function all (req, res) {
    try {
        const type = await Type.find()
        res.json(type)
    } catch (error) {
        res.json({message : error.message})
    }
}

async function createOne (req, res) {
    const type = new Type({
        name : req.body.name,
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
    createOne
}