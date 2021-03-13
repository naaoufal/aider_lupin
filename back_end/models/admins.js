const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({

    fullname : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    phone : {
        type : Number,
        required : true
    },
    password : {
        type : String,
        required : true
    }

})

module.exports = mongoose.model('admins', adminSchema)