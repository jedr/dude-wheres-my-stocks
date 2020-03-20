const superagent = require("superagent")

class FinnhubApiClient {
  constructor(apiKey) {
    this.apiKey = apiKey || ''
  }

  async getQuote(symbol) {
    return superagent
      .get("https://finnhub.io/api/v1/quote")
      .query({
        symbol,
        token: this.apiKey
      })
      .then(res => ({
        currentPrice: res.body.c,
        previousClosePrice: res.body.pc,
        openPrice: res.body.o,
        highPrice: res.body.h,
        lowPrice: res.body.l,
        timestamp: res.body.t
      }))
  }
}

module.exports = FinnhubApiClient
