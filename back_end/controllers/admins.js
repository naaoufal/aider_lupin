require('dotenv').config()
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const Admins = require('../models/admins')

// node mailer
var transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : process.env.GMAIL_USER,
        pass : process.env.GMAIL_PASSWORD
    }
})
 
async function all (req, res) {
    try {
        const admins = await Admins.find()
        res.json(admins)
    } catch (error) {
        res.json({message : error.message})
    }
}

async function add (req, res) {
    const admin = new Admins({
        fullname : req.body.fullname,
        email : req.body.email,
        phone : req.body.phone,
        password : req.body.password
    })
    console.log(admin.email)
    // try {
    //     const newAdmin = await admin.save()
    //     res.json(newAdmin)
    // } catch (err) {
    //     res.json({message : err.message})
    // }
}

module.exports = {
    all,
    add
}