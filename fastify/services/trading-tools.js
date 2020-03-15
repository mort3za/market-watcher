const serviceExir = require("./api-exir.js").service;
const { biggerThan } = require("../utils/helper-trades.js");

exports.service = {
  async latestTrades() {
    const symbol = "btc-tmn";
    let result = (await serviceExir.trades(symbol))[symbol];
    const one_milion = 1000000;
    result = biggerThan(result, one_milion);
    return result;
  }
};
