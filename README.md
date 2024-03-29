# Dude, where's my stocks

[![test](https://github.com/jedr/dude-wheres-my-stocks/workflows/Test/badge.svg)](https://github.com/jedr/dude-wheres-my-stocks/actions?query=workflow:Test)
[![Deployment](https://heroku-badge.herokuapp.com/?app=dude-wheres-my-stocks&root=v2/MSFT&svg=1)](https://dude-wheres-my-stocks.herokuapp.com/v2/MSFT)
[![Dependencies](https://david-dm.org/jedr/dude-wheres-my-stocks.svg)](https://david-dm.org/jedr/dude-wheres-my-stocks)

A programming exercise to write a Node.js REST service that returns stock ticker prices.

Go to <https://dude-wheres-my-stocks.herokuapp.com/v2/GE> to see it in action.

## Endpoints

### /v2/:ticker

Returns the current price of company's stock given the company's ticker at one of the stock exchanges in the USA.

#### Request

```
/v2/:ticker
```

The `:ticker` should be the symbol of a stock traded at one of stock exchanges in the USA, e.g. `MSFT` or `GE`.

#### Response

```js
{
  ticker: "MSFT",
  currentPrice: 210.58
}
```

The `ticker` field contains the requested ticker.

The `currentPrice` field contains the current price of the stock in US dollars.

If you pass a non-existent ticker, the service will return currentPrice = 0.

### [DEPRECATED] /v1/:ticker

DEPREACTED: This endpoint does not work correctly since Finnhub stopped offering non-US stocks in free tier. Use `/v2/:ticker` instead to get US stock prices.

Returns the current price of company's stock given the company's ticker at the Warsaw Stock Exchange.

#### Request

```
/v1/:ticker
```

The `:ticker` should be the symbol of a stock traded at the Warsaw Stock Exchange, e.g. `CDR`.

#### Response

```js
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

### General notes

To run the app, you need to pass the Finnhub API KEY. To obtain it, register at <https://www.finnhub.io>.

If you do not pass the API key, the app might work for some time, but may quickly start returning `429 Too Many Requests`.

If you pass an incorrect API key, the app will return `401 Unauthorized`.

### Running the app in Docker

Requirements:

* Docker

```bash
docker build -t stocks .
docker run -it --rm --env FINNHUB_API_KEY=your-api-key --publish 3000:3000 stocks
```

Visit <http://localhost:3000> in your browser.

### Running the app on bare metal

Requirements:

* Node.js - the version that is used in Dockerfile. It should be the latest (non-LTS) version.

```bash
npm ci
FINNHUB_API_KEY=your-api-key npm start
```

Visit <http://localhost:3000> in your browser.

## Running the tests

There are two types of tests at the moment: unit test and end-to-end tests.

Unit tests test the whole Express app while mocking out the external API.

End-to-end tests run the app without mocking the external API. They need your Finnhub API key to run.

### Running unit tests

On bare metal:

```bash
npm run test:unit
```

With Docker:

```bash
docker build -t stocks .
docker run --rm stocks npm run test:unit
```

### Running end-to-end tests

On bare metal:

```bash
FINNHUB_API_KEY=your-api-key npm run test:e2e
```

With Docker:

```bash
docker build -t stocks .
docker run --rm --env FINNHUB_API_KEY=your-api-key stocks npm run test:e2e
```
