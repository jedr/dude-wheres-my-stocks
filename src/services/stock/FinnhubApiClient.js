const axios = require("axios")

class FinnhubApiClient {
  constructor(apiKey) {
    this.apiKey = apiKey || ''
  }

  async getQuote(symbol) {
    return axios
      .get("https://finnhub.io/api/v1/quote", {
        params: {
          symbol,
          token: this.apiKey
        },
      })
      .then(res => ({
        currentPrice: res.data.c,
        previousClosePrice: res.data.pc,
        openPrice: res.data.o,
        highPrice: res.data.h,
        lowPrice: res.data.l,
        timestamp: res.data.t
      })
    )
  }
}

module.exports = FinnhubApiClient
