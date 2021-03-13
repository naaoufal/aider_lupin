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



// start the server
var port = process.env.PORT || 3001
var server = app.listen(port, () => console.log("the server is started"));
var io = socket(server)