const app = require("../../src/app")
const nock = require("nock")
const request = require("supertest")

describe("App", () => {
  it("returns current price for ticker", async () => {
    const stockPricesMock = createStockPricesMock("AAPL", 248.8)

    await request(app)
      .get("/AAPL")
      .expect(200)
      .expect({
        exchange: "NYSE",
        ticker: "AAPL",
        currentPrice: 248.8
      })

    stockPricesMock.done()
  })
})

function createStockPricesMock(ticker, price) {
  return nock("https://finnhub.io/api/v1")
    .get("/quote")
    .query({
      symbol: ticker,
      token: "fakeapitoken"
    })
    .reply(200, {
      c: price
    })
}

