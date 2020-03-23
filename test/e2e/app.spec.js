const app = require("../../src/app")
const expect = require("chai").expect
const request = require("supertest")

describe("App", () => {
  it("/v1/:ticker", async () => {
    await request(app)
      .get("/v1/CDR")
      .expect(200)
      .then(response => {
        expect(response.body.exchange).to.equal("XWAR")
        expect(response.body.ticker).to.equal("CDR")
        expect(response.body.currentPrice).to.be.a("number").that.is.above(0)
      })
  })
})
