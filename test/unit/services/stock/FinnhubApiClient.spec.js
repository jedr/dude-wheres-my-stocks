const expect = require("chai").expect
const FinnhubApiClient = require("../../../../src/services/stock/FinnhubApiClient")
const nock = require("nock")

describe("FinnhubApiClient", () => {
  it("getQuote", async () => {
    const quoteResponse = {
      o: 5.8,
      c: 7.5,
      l: 5.8,
      h: 7.6,
      pc: 5.2,
      t: 123456789
    }
    const finnhubApiMock = nock("https://finnhub.io/api/")
      .get("/v1/quote")
      .query({
        symbol: "TIC",
        token: "api-key"
      })
      .reply(200, quoteResponse)
    const client = new FinnhubApiClient("api-key")

    const quote = await client.getQuote("TIC")

    expect(quote).to.deep.equal({
      openPrice: quoteResponse.o,
      currentPrice: quoteResponse.c,
      lowPrice: quoteResponse.l,
      highPrice: quoteResponse.h,
      previousClosePrice: quoteResponse.pc,
      timestamp: quoteResponse.t
    })

  })
})
