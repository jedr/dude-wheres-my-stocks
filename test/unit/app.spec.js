const app = require("../../src/app")
const nock = require("nock")
const request = require("supertest")

describe("App", () => {
  it("returns current price for ticker", async () => {
    const apiMock = nock("https://finnhub.io/api/v1")
      .get("/quote")
      .query({
        symbol: "AAPL",
        token: "fakeapitoken"
      })
      .reply(200, {
        c: 248.8
      })

    await request(app)
      .get("/AAPL")
      .expect(200)
      .expect({
        exchange: "NYSE",
        ticker: "AAPL",
        currentPrice: 248.8
      })

    apiMock.done()
  })
})
