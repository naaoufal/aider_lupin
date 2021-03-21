const express = require("express")
const router = express.Router()
const access = require('../midllewares/superAdminAuth')

// declare our routes
const typeCon = require("../controllers/productType")


router.get("/all", typeCon.all)

router.patch("/edit/:id", access, typeCon.edit)

router.post("/add", access, typeCon.createOne)


module.exports = router