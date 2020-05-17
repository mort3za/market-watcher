const serviceExir = require("./api-exir.js").service;
const { addPriceUSD, addTotalPriceUSD, filterIneffectivePrices, filterIneffectiveDates } = require("../utils/helper-trades.js");
const adapterExir = require("../adapters/exir.js").adapter;

const service = {
  async latestTrades() {
    const symbol = "btc-tmn";
    let result;
    try {
      result = await serviceExir.trades(symbol);
      result = result[symbol];
    } catch (error) {
      throw error;
    }
    result = adapterExir.trades(result, symbol);
    result = await addPriceUSD(result);
    result = await addTotalPriceUSD(result);
    result = await filterIneffectivePrices(result);
    console.log('===============================ys????????');
    
    result = await filterIneffectiveDates(result);
    console.log("result after =========== ", result.slice(0, 3));

    return result;
  },

  
};

exports.service = service;
