const express = require("express")
const v1Router = require("./routes/v1")
const v2Router = require("./routes/v2")
const noCache = require("./noCache.js")

const app = express()

app.use(noCache)

app.use("/v1", v1Router)
app.use("/v2", v2Router)

module.exports = app
