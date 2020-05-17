const serviceExir = require("./api-exir.js").service;
const {
  addPriceUSD,
  addTotalPriceUSD,
  filterIneffectivePrices,
  filterIneffectiveDates,
} = require("../utils/helper-trades.js");
const adapterCurrencies = require("../adapters/currencies.js").adapter;
const adapterExir = require("../adapters/exir.js").adapter;
const adapterNobitex = require("../adapters/nobitex.js").adapter;

const service = {
  async latestTrades(symbolSrc = "btc", symbolDst = "tmn") {
    const result = {
      exir: await _get_exir_trades_filtered(symbolSrc, symbolDst),
      // nobitex: await _get_nobitex_trades_filtered(symbolSrc, symbolDst),
    };
    console.log("result ====================>", result);

    return result;
  },
};

async function _get_exir_trades_filtered(src, dst) {
  const symbol = adapterCurrencies.exchangeSymbol(src, dst, "a-b");
  const source = adapterCurrencies.formatName(src, "a");
  const destination = adapterCurrencies.formatName(dst, "a");
  let result;
  try {
    result = await serviceExir.fetch_trades(symbol);
    result = result[symbol];
  } catch (error) {
    throw error;
  }
  result = adapterExir.trades(result, source, destination);
  // TODO: move to adapter exir
  result = await addPriceUSD(result);
  result = await addTotalPriceUSD(result);

  result = await filterIneffectivePrices(result);
  result = await filterIneffectiveDates(result);

  return result;
}

async function _get_nobitex_trades_filtered(src, dst) {
  const symbol = adapterCurrencies.exchangeSymbol(src, dst, "AB");
  const source = adapterCurrencies.formatName(src, "a");
  const destination = adapterCurrencies.formatName(dst, "a");
  let result;
  try {
    result = await adapterNobitex.fetch_trades(symbol);
    result = result[symbol];
  } catch (error) {
    throw error;
  }
  result = adapterExir.trades(result, source, destination);
  // TODO: move to adapter exir
  result = await addPriceUSD(result);
  result = await addTotalPriceUSD(result);

  result = await filterIneffectivePrices(result);
  result = await filterIneffectiveDates(result);
  console.log("result after filters nobitex =========== ", result);

  return result;
}

exports.service = service;
