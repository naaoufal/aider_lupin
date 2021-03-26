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
    roleUser : {
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
    }

})

module.exports = mongoose.model('users', UserSchema)