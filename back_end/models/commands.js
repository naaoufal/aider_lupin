const mongoose = require('mongoose')

const commandSchema = new mongoose.Schema({

    productName : {
        type : String,
        required : true,
    },
    productId : {
        type : String,
        required : true,
    },
    buyerId : {
        type : String,
        required : true,
    },
    idSeller : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    date : {
        type : Date,
        required : true
    },
    is_validate : {
        type : Boolean,
        required : true
    }

})

module.exports = mongoose.model('commands', commandSchema)