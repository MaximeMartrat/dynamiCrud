const express = require('express')
const app = express()
const userRoute = require('./src/route/userRoute')
const crudRoute = require('./src/route/crudRoute')
app.use(express.json())

app.use(userRoute)
app.use(crudRoute)

module.exports = app;