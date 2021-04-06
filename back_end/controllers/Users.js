require('dotenv').config()
const Users = require('../models/users')
const Commands = require('../models/commands')


async function allBuyers (req, res) {
    try {
        const users = await Users.find({
            role : "buyer"
        })
        res.json(users)
    } catch (error) {
        res.json({message : error.message})
    }
}

async function allSellers (req, res) {
    try {
        const users = await Users.find({
            role : "seller"
        })
        res.json(users)
    } catch (error) {
        res.json({message : error.message})
    }
}

async function allUser (req, res) {
    try {
        const users = await Users.find()
        res.json(users)
    } catch (error) {
        res.json({message : error.message})
    }
}

async function oneUser (req, res) {
    try {
        const users = await Users.find({
            id : id
        })
        res.json(users)
    } catch (error) {
        res.json({message : error.message})
    }
}

async function add (req, res) {
    const user = new Users({
        fullname : req.body.fullname,
        email : req.body.email,
        phone : req.body.phone,
        password : req.body.password,
        is_reseted : req.body.is_reseted,
        role : req.body.role,
        userType : req.body.userType,
        numberOfSell : req.body.numberOfSell
    })
    try {
        const newUser = await user.save()
        res.json(newUser)
    } catch (err) {
        res.json({message : err.message})
    }
}

async function edit (req, res) {
    if(!req.body){
        return res.send({message : "they is not data !!!"})
    }
    const id = req.params.id
    Users.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        //console.log(data.email)
        if (!data) {
            res.send({
              message: `they is no User !`
            });
          } else {
            res.send({ message: "User is updated successfully." })            
          }
    })
}

async function deleteUser (req, res) {
    Users.findByIdAndDelete(req.params.id).then( () => {
        res.json()
    })
}

module.exports = {
    allBuyers,
    allSellers,
    allUser,
    edit,
    add,
    deleteUser,
    oneUser
}