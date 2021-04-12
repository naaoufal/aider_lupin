const mongoose = require('mongoose')

const fireSaleSchema = new mongoose.Schema({

    name : {
        type : String,
        //required : true,
    },
    image : {
        type : String,
        //required : true,
    },
    price : {
        type : Number,
        //required : true
    },
    desc : {
        type : String,
        //required : true
    },
    idSeller : {
        type : String,
        //required : true
    }

})

module.exports = mongoose.model('firesale', fireSaleSchema)