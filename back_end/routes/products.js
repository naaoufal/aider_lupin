const express = require("express")
const router = express.Router()
const multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../lupin/front_end/public/images')
    },
    filename : function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
})

const upload = multer({storage : storage})

// declare our routes
const productCon = require("../controllers/products")



router.post("/add", upload.single('image'), productCon.add)

router.get("/all", productCon.all)

// router.patch("/edit/:id", upload.single('image'), productCon.edit)

router.delete("/delete/:id", productCon.deleteOne)


module.exports = router
