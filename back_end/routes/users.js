const express = require("express")
const router = express.Router()

// declare our routes
const userCon = require("../controllers/Users")


router.get("/all", userCon.allUsers)

router.post("/add", userCon.add)


module.exports = router