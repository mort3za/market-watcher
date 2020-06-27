const serviceExir = require("./api-exir.js").service;
const serviceNobitex = require("./api-nobitex.js").service;
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
  // trades
  async latest_trades(symbolSrc = "btc", symbolDst = "irt") {
    const result = {
      symbol: symbolSrc,
      exir: await _get_exir_trades_filtered(symbolSrc, symbolDst),
      nobitex: await _get_nobitex_trades_filtered(symbolSrc, symbolDst),
    };
    return result;
  },

  // orderbook
  async latest_orderbooks(symbolSrc = "btc", symbolDst = "irt") {
    const result = {
      symbol: symbolSrc,
      exir: await _get_exir_orderbook_filtered(symbolSrc, symbolDst),
      nobitex: await _get_nobitex_orderbook_filtered(symbolSrc, symbolDst),
    };
    return result;
  },
};

// ---------------------------------------------------------------------------------
// private functions
// ---------------------------------------------------------------------------------
async function _get_exir_orderbook_filtered(src, dst) {
  const symbol = adapterCurrencies.exchangeSymbol(src, dst, "a-b");

  let result;
  try {
    result = await serviceExir.fetch_orderbooks(symbol);
    result = adapterExir.orderbook(result, symbol);
  } catch (error) {
    throw error;
  }

  result = await addPriceUSD(result);
  result = await addTotalPriceUSD(result);

  return result;
}

async function _get_nobitex_orderbook_filtered(src, dst) {
  const symbol = adapterCurrencies.exchangeSymbol(src, dst, "AB", {
    useIRT: true,
  });

  let result;
  try {
    result = await serviceNobitex.fetch_orderbooks(symbol);
    result = adapterNobitex.orderbook(result, symbol);
  } catch (error) {
    throw error;
  }

  result = await addPriceUSD(result);
  result = await addTotalPriceUSD(result);

  return result;
}

async function _get_exir_trades_filtered(src, dst) {
  const symbol = adapterCurrencies.exchangeSymbol(src, dst, "a-b");
  let result;
  try {
    result = await serviceExir.fetch_trades(symbol);
    result = result[symbol];
    result = adapterExir.trades(result);
  } catch (error) {
    throw error;
  }

  result = await addPriceUSD(result);
  result = await addTotalPriceUSD(result);
  // console.log('exir items count:', result.length);

  // result = await filterIneffectivePrices(result);
  // result = await filterIneffectiveDates(result);

  return result;
}

async function _get_nobitex_trades_filtered(src, dst) {
  const symbol = adapterCurrencies.exchangeSymbol(src, dst, "AB", {
    useIRT: true,
  });
  let result;
  try {
    result = await serviceNobitex.fetch_trades(symbol);
    result = result.trades;
  } catch (error) {
    throw error;
  }
  result = adapterNobitex.trades(result);
  // TODO: move to adapter nobitex
  result = await addPriceUSD(result);
  result = await addTotalPriceUSD(result);
  // console.log('nobitex items count:', result.length);

  // result = await filterIneffectivePrices(result);
  // result = await filterIneffectiveDates(result);

  return result;
}

exports.service = service;
