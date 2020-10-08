const app = require("../../src/app")
const nock = require("nock")
const request = require("supertest")

describe("App", () => {
  describe("/v2", () => {
    it("returns current price for a US ticker", async () => {
      const stockPricesMock = createStockPricesMock("MSFT", 211.27)

      await request(app)
        .get("/v2/MSFT")
        .expect(200)
        .expect({
          ticker: "MSFT",
          currentPrice: 211.27
        })

      stockPricesMock.done()
    })

    it("returns 429 \"Too Many Requests\" when too many requests", async () => {
      const stockPricesMock = createOverloadedStockPricesMock()

      await request(app)
        .get("/v2/GE")
        .expect(429)
    })
  })

  describe("/v1", () => {
    it("returns current price for a Warsaw Stock Exchange ticker", async () => {
      const stockPricesMock = createStockPricesMock("08N.WA", 248.8)

      await request(app)
        .get("/v1/08N")
        .expect(200)
        .expect({
          exchange: "XWAR",
          ticker: "08N",
          currentPrice: 248.8
        })

      stockPricesMock.done()
    })

    it("returns 429 \"Too Many Requests\" when too many requests", async () => {
      const stockPricesMock = createOverloadedStockPricesMock()

      await request(app)
        .get("/v1/AB")
        .expect(429)
    })
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

function createOverloadedStockPricesMock() {
  return nock("https://finnhub.io/api/v1")
    .get("/quote")
    .query(true)
    .reply(429)
}
