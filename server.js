const express = require("express")
const socket = require("socket.io")
const cors = require('cors');
require("dotenv").config()
const connectDB = require("./back_end/config/mongodb")
const app = express()

connectDB()

app.use(express.json());

app.use(cors());

// declare our endpoints here:
app.use("/api/superadmins", require("./back_end/routes/superAdmins.js"))
app.use("/api/admins", require("./back_end/routes/admins.js"))
app.use("/api/productsType", require("./back_end/routes/productType"))


// start the server
var port = process.env.PORT || 3001
var server = app.listen(port, () => console.log("the server is started"));
var io = socket(server)