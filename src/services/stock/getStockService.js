const FinnhubStockService = require("./FinnhubStockService")

const getStockService = () => {
  return new FinnhubStockService()
}

module.exports = getStockService
