require('dotenv').config()
const jwt = require('jsonwebtoken')
const Admins = require('../models/admins')

 
async function all (req, res) {
    try {
        const superAdmins = await Superadmins.find()
        res.json(superAdmins)
    } catch (error) {
        res.json({message : error.message})
    }
}

module.exports = {
    all
}