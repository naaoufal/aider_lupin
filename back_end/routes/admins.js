const express = require("express")
const router = express.Router()
const access = require('../midllewares/superAdminAuth')
const adminAccess = require('../midllewares/adminauth')

// declare our routes
const adminCon = require("../controllers/admins")



router.post("/add", access, adminCon.add)

router.get("/all", access, adminCon.all)

router.get("/allAdmins", adminCon.allAdmins)

router.patch("/edit/:id", access, adminCon.edit)

router.delete("/delete/:id", access, adminCon.deleteAdmin)

router.get("/oneAdmin/:id", adminCon.getAdminById)

router.post("/authAdmin", adminCon.loginAdmin)


module.exports = router
