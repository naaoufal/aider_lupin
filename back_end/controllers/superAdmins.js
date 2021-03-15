require('dotenv').config()
const jwt = require('jsonwebtoken')
const Superadmins = require('../models/superAdmins')
const Admins = require('../models/admins')

 
async function all (req, res) {
    try {
        const superAdmins = await Superadmins.find()
        res.json(superAdmins)
    } catch (error) {
        res.json({message : error.message})
    }
}

// async function createOne (req, res) {
//     const superAdmin = new Superadmins({
//         fullname : req.body.fullname,
//         email : req.body.email,
//         password : req.body.password
//     })
//     try {
//         const newSuperAdmin = await superAdmin.save()
//         res.json(newSuperAdmin)
//     } catch (err) {
//         res.json({message : err.message})
//     }
// }

function login (req, res, next) {
    const {email, password} = req.body
    Superadmins.findOne({
        email : email,
        password : password
    }).then(admin => {
        if(!admin){
            res.json({message : "You re Not Allowed"})
        } else {
            const email = req.body.email
            const password = req.body.password
            const ad = {adname : email, adpassword : password}
            const accessToken = jwt.sign(ad, process.env.ACCESS_TOKEN_SUPER)
            res.json({accessToken : accessToken})
            res.ad = ad
            next()
        }
    })
}

module.exports = {
    all,
    login
}