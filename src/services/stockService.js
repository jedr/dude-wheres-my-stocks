const superagent = require("superagent")

const getCurrentStockPrice = (exchangeSymbol, stockSymbol) => {
  return superagent
    .get("https://finnhub.io/api/v1/quote")
    .query({
      symbol: stockSymbol,
      token: process.env.FINNHUB_API_KEY
    })
    .then(res => {
      return res.body.c
    })
}

module.exports = {
  getCurrentStockPrice
}
