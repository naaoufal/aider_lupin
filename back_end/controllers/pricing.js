require('dotenv').config()
const Pricing = require('../models/pricing')

async function all (req, res) {
    try {
        const pricing = await Pricing.find()
        res.json(pricing)
    } catch (error) {
        res.json({message : error.message})
    }
}

async function addOne (req, res) {
    const pricing = new Pricing({
        name : req.body.name,
        score : req.body.score,
        desc : req.body.desc
    })
    try {
        const newPricing = await pricing.save()
        res.json(newPricing)
    } catch (err) {
        res.json({message : err.message})
    }
}

async function edit (req, res) {
    if(!req.body){
        return res.send({message : "they is not data !!!"})
    }
    const id = req.params.id
    Pricing.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.send({
              message: `they is no pricing !`
            });
          } else {
            res.send({ message: "pricing is updated successfully." })            
          }
    })
}

async function deleteOne (req, res) {
    Pricing.findByIdAndDelete(req.params.id).then( () => {
        res.json()
    })
}



module.exports = {
    all,
    addOne,
    edit,
    deleteOne
}