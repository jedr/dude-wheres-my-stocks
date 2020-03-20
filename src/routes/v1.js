const constants = require("../constants")
const express = require("express")
const getStockService = require("./../services/stock/getStockService")

const v1Router = express.Router()

v1Router.get("/:ticker", async (req, res, next) => {
  const exchangeMic = constants.defaultExchangeMic
  const ticker = req.params.ticker

  try {
    const currentPrice = await getStockService().getCurrentStockPrice(exchangeMic, ticker)
    res.send({
      exchange: exchangeMic,
      ticker,
      currentPrice
    })
  } catch (err) {
    if (err.status === 429) {
      return res.sendStatus(err.status)
    }
    next(err)
  }
})

module.exports = v1Router
