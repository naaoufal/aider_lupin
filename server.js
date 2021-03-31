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

// config paypal
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': process.env.ID_CLIENT,
    'client_secret': process.env.SECRET
})


// declare our endpoints here:
app.use("/api/superadmins", require("./back_end/routes/superAdmins.js"))
app.use("/api/admins", require("./back_end/routes/admins.js"))
app.use("/api/productsType", require("./back_end/routes/productType.js"))
app.use("/api/users", require("./back_end/routes/users.js"))
app.use("/api/delivery", require("./back_end/routes/delivery.js"))
app.use("/api/pricing", require("./back_end/routes/pricing.js"))


// start the server
var port = process.env.PORT || 3001
var server = app.listen(port, () => console.log("the server is started"));
var io = socket(server)