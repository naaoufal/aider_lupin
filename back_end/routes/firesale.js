const express = require("express")
const router = express.Router()

const fireSaleCon = require("../controllers/firesale")

router.post("/add", fireSaleCon.add)

router.get("/all", fireSaleCon.all)

router.delete("/delete/:id", fireSaleCon.deleteOne)

module.exports = router