const mongoose = require('mongoose')

const adsSchema = new mongoose.Schema({

    image : {
        type : String,
        required : true,
    },
    price : {
        type : Number,
        required : true,
    },
    desc : {
        type : String,
        required : true
    }

})

module.exports = mongoose.model('ads', adsSchema)