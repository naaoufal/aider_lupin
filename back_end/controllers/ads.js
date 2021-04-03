require('dotenv').config()
const Ads = require('../models/ads')

// search for all products to render it in buyer page
async function all (req, res) {
    try {
        const ads = await Ads.find()
        res.json(ads)
    } catch (error) {
        res.json({message : error.message})
    }
}

// random ads
async function randomOne (req, res) {
    try {
        const ads = await Ads.aggregate([{ $sample: { size: 1 } }])
        res.json(ads)
    } catch (error) {
        res.json({message : error.message})
    }
}


async function add (req, res) {
    const ads = new Ads({
        image : req.file.filename,
        price : req.body.price,
        desc : req.body.desc,
    })
    try {
        const newAds = await ads.save()
        res.json(newAds)
    } catch (err) {
        res.json({message : err.message})
    }
}

async function deleteOne (req, res) {
    Ads.findByIdAndDelete(req.params.id).then( () => {
        res.json()
    })
}

module.exports = {
    all,
    add,
    deleteOne,
    randomOne
}