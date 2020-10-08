const app = require("../../src/app")
const expect = require("chai").expect
const request = require("supertest")

describe("App", () => {
  it("/v2/:ticker", async () => {
    await request(app)
      .get("/v2/MSFT")
      .expect(200)
      .then(response => {
        expect(response.body.ticker).to.equal("MSFT")
        expect(response.body.currentPrice).to.be.a("number").that.is.above(0)
      })
  })
})
