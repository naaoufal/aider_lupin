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

// public function:
async function allAdmins (req, res) {
    try {
        const admins = await Admins.find()
        res.json(admins)
    } catch (error) {
        res.json({message : error.message})
    }
}

async function getAdminById (req, res, next) {
    let admin
    try {
        admin = await Admins.findById(req.params.id);
        res.json(admin)

        const query = {is_reseted : true}

    } catch (error) {
        return res.json({message : error.message})
    }
    res.admin = admin
    next()
}

async function add (req, res) {
    const admin = new Admins({
        fullname : req.body.fullname,
        email : req.body.email,
        phone : req.body.phone,
        password : req.body.password,
        is_reseted : req.body.is_reseted,
        stat : req.body.stat
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
                res.json({message : "Email send to admin"})
            }
        })
    } catch (err) {
        res.json({message : err.message})
    }
}

async function edit (req, res) {
    if(!req.body){
        return res.send({message : "they is not data !!!"})
    }
    const id = req.params.id
    Admins.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        //console.log(data.email)
        if (!data) {
            res.send({
              message: `they is no admin !`
            });
          } else {
            res.send({ message: "admin is updated successfully." })            
          }
    })
}

async function deleteAdmin (req, res) {
    Admins.findByIdAndDelete(req.params.id).then( () => {
        res.json()
    })
}

function loginAdmin (req, res, next) {
    const {email, password} = req.body
    Admins.findOne({
        email : email,
        password : password
    }).then(admin => {
        if(!admin){
            res.json({message : "You re Not Allowed"})
        } else {
            const email = req.body.email
            const password = req.body.password
            const ad = {adname : email, adpassword : password}
            const accessToken = jwt.sign(ad, process.env.ACCESS_TOKEN_NORMAL)
            res.json({accessToken : accessToken})
            res.ad = ad
            next()
        }
    })
}

module.exports = {
    all,
    add,
    edit,
    deleteAdmin,
    getAdminById,
    loginAdmin,
    allAdmins
}