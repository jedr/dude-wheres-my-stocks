const express = require("express")
const getStockService = require("./../services/stock/getStockService")

const v2Router = express.Router()

v2Router.get("/:ticker", async (req, res, next) => {
  // Let's pretend the ticker is from NYSE. Finnhub doesn't really care, as long as it is a US stock.
  exchangeMic = 'XNYS'
  const ticker = req.params.ticker

  try {
    const currentPrice = await getStockService().getCurrentStockPrice(exchangeMic, ticker)
    res.send({
      ticker,
      currentPrice
    })
  } catch (err) {
    if (err.response.status === 429) {
      return res.sendStatus(err.response.status)
    }
    next(err)
  }
})

module.exports = v2Router
