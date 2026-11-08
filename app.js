const express = require('express')
const app = express()

const router = require('./routes/itemRoute')
const errorHandler = require("./middlewares/errorHandler")
const cors = require('cors')

app.use(cors())

app.use(express.json())
app.use('/api/listing', router)
app.use(errorHandler)

module.exports = app