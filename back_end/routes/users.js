const express = require("express")
const router = express.Router()

// declare our routes
const userCon = require("../controllers/Users")


router.get("/allBuyers", userCon.allBuyers)

router.get("/allSellers", userCon.allSellers)

router.post("/add", userCon.add)


module.exports = router