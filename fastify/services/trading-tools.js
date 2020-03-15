const serviceExir = require("./api-exir.js").service;
const { biggerThan } = require("../utils/helper-trades.js");
const adapterExir = require("../adapters/exir.js").adapter;

exports.service = {
  async latestTrades() {
    const symbol = "btc-tmn";
    let result;
    try {
      result = await serviceExir.trades(symbol);
    } catch (error) {
      throw error;
    }
    result = result[symbol];
    result = adapterExir.trades(result, symbol);
    console.log("result", result);

    const one_milion = 1000000;
    result = biggerThan(result, one_milion);
    return result;
  }
};
