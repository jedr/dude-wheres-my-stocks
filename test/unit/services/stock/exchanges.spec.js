const exchanges = require("../../../../src/services/stock/exchanges")
const expect = require("chai").expect

describe("Exchanges", () => {
  it("have well defined structure", () => {
    Object.keys(exchanges).forEach(exchangeKey => {
      const exchange = exchanges[exchangeKey]
      expect(exchange).to.have.property("name").that.is.a("string").of.length.above(0, `${exchangeKey}.name should not be empty`)
      expect(exchange).to.have.property("marketIdentifierCode").that.is.a("string").of.length.above(0, `${exchangeKey}.marketIdentifierCode should not be empty`)
    })
  })
})
