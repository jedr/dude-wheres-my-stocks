const FinnhubApiClient = require("./FinnhubApiClient")

class FinnhubStockService {
  constructor() {
    this.client = new FinnhubApiClient(process.env.FINNHUB_API_KEY)

    this.finnhubExchangeSymbols = {
      XNAS: '',
      XNYS: '',
      XWAR: 'WA'
    }
  }

  async getCurrentStockPrice(exchangeMic, stockSymbol) {
    const quote = await this.client.getQuote(this.getFinnhubStockSymbol(exchangeMic, stockSymbol))
    return quote.currentPrice
  }

  getFinnhubStockSymbol(exchangeMic, stockSymbol) {
    const finnhubExchangeSymbol = this.finnhubExchangeSymbols[exchangeMic]
    if (finnhubExchangeSymbol) {
      return `${stockSymbol}.${finnhubExchangeSymbol}`
    }
    return stockSymbol
  }
}

module.exports = FinnhubStockService
