const exchanges = require("./services/stock/exchanges")

const constants = {
  defaultExchangeMic: exchanges.WarsawStockExchange.marketIdentifierCode
}

module.exports = constants
