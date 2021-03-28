const mongoose = require('mongoose')

const deliverySchema = new mongoose.Schema({

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
    stat : {
        type : String,
        required : true
    }

})

module.exports = mongoose.model('delivery', deliverySchema)