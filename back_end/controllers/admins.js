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
        password : req.body.password,
        is_reseted : req.body.is_reseted
    })
    try {
        const newAdmin = await admin.save()
        //res.json(newAdmin)
        var mailOptions = {
            from : process.env.GMAIL_USER,
            to : admin.email,
            subject : 'General information',
            text : `You need to reset your password first !!! \n` +
            `Your Email is : ` + admin.email + `\n` +
            `Your Password is : ` + admin.password
        }
    
        transporter.sendMail(mailOptions, function(err, info) {
            if(err){
                res.json({message : err.message})
            } else {
                res.json({message : "Email send to participant"})
            }
        })
    } catch (err) {
        res.json({message : err.message})
    }
}

module.exports = {
    all,
    add
}