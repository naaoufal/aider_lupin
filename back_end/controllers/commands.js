require('dotenv').config()
const Commands = require('../models/commands')

async function all (req, res) {
    try {
        const commands = await Commands.find()
        res.json(commands)
    } catch (error) {
        res.json({message : error.message})
    }
}

async function addOne (req, res) {
    const command = new Commands({
        productName : req.body.productName,
        buyerEmail : req.body.buyerEmail,
        idSeller : req.body.idSeller,
        price : req.body.price,
        date : req.body.date,
        is_validate : req.body.is_validate
    })
    try {
        const newCommand = await command.save()
        res.json(newCommand)
    } catch (err) {
        res.json({message : err.message})
    }
}

async function edit (req, res) {
    if(!req.body){
        return res.send({message : "they is not data !!!"})
    }
    const id = req.params.id
    Commands.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.send({
              message: `they is no command !`
            });
          } else {
            res.send({ message: "command is updated successfully." })            
          }
    })
}

async function deleteOne (req, res) {
    Commands.findByIdAndDelete(req.params.id).then( () => {
        res.json()
    })
}

module.exports = {
    all,
    addOne,
    edit,
    deleteOne
}