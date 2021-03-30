const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

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
        required : true,
    },
    role : {
        type : String,
        required : true,
    },
    is_reseted : {
        type : Boolean,
        required : true,
    },
    password : {
        type : String,
        required : true
    },
    userType : {
        type : String,
        required : true
    },
    numberOfSell : {
        type : Number,
        required : true
    }

})

module.exports = mongoose.model('users', UserSchema)