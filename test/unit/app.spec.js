const app = require("../../src/app")
const request = require("supertest")

describe("App", () => {
  it("returns current price for ticker", async () => {
    await request(app)
      .get("/AAPL")
      .expect(200)
  })
})
