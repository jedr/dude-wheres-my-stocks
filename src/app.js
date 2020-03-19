const express = require("express")
const getCurrentStockPrice = require("./services/stockService").getCurrentStockPrice

const app = express()

app.get("/:ticker", (req, res, next) => {
  const exchange = "NYSE"
  const ticker = req.params.ticker

  getCurrentStockPrice(exchange, ticker)
    .then(currentPrice => {
      res.send({
        exchange: exchange,
        ticker,
        currentPrice
      })
    })
    .catch(err => {
      if (err.status === 429) {
        return res.sendStatus(err.status)
      }
      next(err)
    })
})

module.exports = app
