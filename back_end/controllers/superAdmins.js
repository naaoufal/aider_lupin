require('dotenv').config()
const Superadmins = require('../models/superAdmins')

 
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