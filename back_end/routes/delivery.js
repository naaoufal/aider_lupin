const express = require("express")
const router = express.Router()

// declare our routes
const deliveryCon = require("../controllers/delivery")



router.post("/add", deliveryCon.add)

router.get("/all", deliveryCon.all)

router.delete("/delete/:id", deliveryCon.deleteDelivery)


module.exports = router