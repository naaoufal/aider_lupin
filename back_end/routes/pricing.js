const express = require("express")
const router = express.Router()

// declare our routes
const pricingCon = require("../controllers/pricing")



router.post("/add", pricingCon.addOne)

router.get("/all", pricingCon.all)

router.patch("/edit/:id", pricingCon.edit)

router.delete("/delete/:id", pricingCon.deleteOne)



module.exports = router
