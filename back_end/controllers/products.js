require('dotenv').config()
const Products = require('../models/products')
const multer = require('multer')

const fileStorage = multer.diskStorage({})
const upload = multer()



module.exports = {

}