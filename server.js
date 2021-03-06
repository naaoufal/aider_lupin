const express = require("express")
const socket = require("socket.io")
const cors = require('cors')
const paypal = require('paypal-rest-sdk')
require("dotenv").config()
const connectDB = require("./back_end/config/mongodb")
const app = express()

connectDB()

app.use(express.json());

app.use(cors());


// declare our endpoints here:
app.use("/api/superadmins", require("./back_end/routes/superAdmins.js"))
app.use("/api/ads", require("./back_end/routes/ads.js"))
app.use("/api/admins", require("./back_end/routes/admins.js"))
app.use("/api/productsType", require("./back_end/routes/productType.js"))
app.use("/api/users", require("./back_end/routes/users.js"))
app.use("/api/delivery", require("./back_end/routes/delivery.js"))
app.use("/api/pricing", require("./back_end/routes/pricing.js"))
app.use("/api/products", require("./back_end/routes/products.js"))
app.use("/api/commands", require("./back_end/routes/commands.js"))
app.use("/api/firesale", require("./back_end/routes/firesale.js"))


// start the server
var port = process.env.PORT || 3001
app.listen(port, () => console.log("the server is started"));