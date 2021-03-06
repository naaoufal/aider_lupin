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
const adsCon = require("../controllers/ads")



router.post("/addOne", upload.single('image', 1), adsCon.add)

router.get("/randomAds", adsCon.randomOne)

router.get("/all", adsCon.all)

router.delete("/delete/:id", adsCon.deleteOne)


module.exports = router