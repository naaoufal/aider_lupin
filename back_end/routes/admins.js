const express = require("express")
const router = express.Router()
const access = require('../midllewares/superAdminAuth')

// declare our routes
const adminCon = require("../controllers/admins")

router.post("/add", access, adminCon.add)

router.get("/all", access, adminCon.all)

router.patch("/edit/:id", access, adminCon.edit)

router.delete("/delete/:id", access, adminCon.deleteAdmin)

router.get("/oneAdmin/:id", adminCon.getAdminById)

router.post("/authAdmin", adminCon.loginAdmin)


module.exports = router
