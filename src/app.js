const express = require("express")
const v1Router = require("./routes/v1")
const noCache = require("./noCache.js")

const app = express()

app.use(noCache)

app.use("/v1", v1Router)

module.exports = app
