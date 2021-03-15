require('dotenv').config()
const jwt = require('jsonwebtoken')
const Admins = require('../models/superAdmin')

module.exports = function auth (req, res, next) {
    const autHeader = req.headers['authorization']
    const token = autHeader && autHeader.split(' ')[1]
  
    if(token == null){
        return res.sendStatus(403)
    }
  
    const code = jwt.verify(token, process.env.ACCESS_TOKEN_SUPER)
    const admin = Admins.findById(code.id)

    if(!admin){
        return res.sendStatus(404)
    }
    req.admin = admin
    next()
}