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

async function edit (req, res) {
    if(!req.body){
        return res.send({message : "they is not data !!!"})
    }
    const id = req.params.id
    Type.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        //console.log(data.email)
        if (!data) {
            res.send({
              message: `they is no type !`
            });
          } else {
            res.send({ message: "productType is updated successfully." })            
          }
    })
}

async function deleteOne (req, res) {
    Type.findByIdAndDelete(req.params.id).then( () => {
        res.json()
    })
}


module.exports = {
    all,
    createOne,
    edit,
    deleteOne
}