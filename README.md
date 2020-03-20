# Dude, where's my stocks?

A programming exercise to write a Node.js REST service that returns stock ticker prices.

Go to https://dude-wheres-my-stocks.herokuapp.com/ to see it in action.

## Endpoints

### /v1/:ticker

Returns the current price of company's stock given the company's ticker at the Warsaw Stock Exchange.

#### Request

```
/v1/:ticker
```

The `:ticker` should be the symbol of a stock traded at the Warsaw Stock Exchange, e.g. `CDR`.

#### Response

```
{
  exchange: "XWAR",
  ticker: "CDR",
  currentPrice: 273.5
}
```

The `exchange` field contains the exchange's Market Identifier Code, according to ISO-10383.

The `ticker` field contains the requested ticker.

The `currentPrice` field contains the current price of the stock.

If you pass a non-existent ticker, the service will return currentPrice = 0.

## Running the app

Requirements:
* Node.js - the version that is used in Dockerfile. It should be the latest LTS version.
* Yarn - the latest version of Yarn 1.

```
yarn --frozen-lockfile
FINNHUB_API_KEY=your-api-key npm start
```

To run the app, you need to pass the Finnhub API KEY. To obtain it, register at https://www.finnhub.io.

If you do not pass the API key, the app might work for some time, but may quickly start returning `429 Too Many Requests`.

If you pass an incorrect API key, the app will return `401 Unauthorized`.

## Running the tests

```
npm test
```
