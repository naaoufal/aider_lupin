const mongoose = require('mongoose')

const princingSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true,
    },
    score : {
        type : Number,
        required : true,
    },
    desc : {
        type : String,
        required : true
    }

})

module.exports = mongoose.model('pricing', princingSchema)