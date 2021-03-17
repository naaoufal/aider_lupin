const express = require("express")
const router = express.Router()
const access = require('../midllewares/superAdminAuth')

// declare our routes
const adminCon = require("../controllers/admins")

router.post("/add", access, adminCon.add)

router.get("/all", access, adminCon.all)


module.exports = router
