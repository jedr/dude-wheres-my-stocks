const express = require("express")
const getCurrentStockPrice = require("../services/stockService").getCurrentStockPrice

const v1Router = express.Router()

v1Router.get("/:ticker", (req, res, next) => {
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

module.exports = v1Router
