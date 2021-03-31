const express = require("express")
const router = express.Router()
const multer = require('multer')

var filestorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
})

const upload = multer({storage : filestorage})

// declare our routes
const productCon = require("../controllers/products")



router.post("/add", upload, productCon.add)

router.get("/all", productCon.all)

// router.patch("/edit/:id", upload.single('image'), productCon.edit)

// router.delete("/delete/:id", productCon.deleteOne)


module.exports = router
