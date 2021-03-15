const express = require("express")
const router = express.Router()
const access = require('../midllewares/superAdminAuth')

// declare our routes
const superCon = require("../controllers/superAdmins")


router.get("/all", access, superCon.all)

router.post("/auth", superCon.login)

router.post("/addAdmin", access, superCon.add)

// router.post("/add", superCon.createOne)


module.exports = router