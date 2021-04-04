const express = require("express")
const router = express.Router()

// declare our routes
const commandCon = require("../controllers/commands")



router.post("/add", commandCon.addOne)

router.get("/all", commandCon.all)

router.patch("/edit/:id", commandCon.edit)

router.delete("/delete/:id", commandCon.deleteOne)


module.exports = router