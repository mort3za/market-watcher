const currencies = require("./currencies.js").adapter;

exports.adapter = {
  trades(values) {
    return values.map((value) => {
      return {
        amount: value.size,
        price: value.price,
        type: value.side,
        timestamp: new Date(value.timestamp).getTime(),
        total_price: value.price * value.size,
      };
    });
  },

  orderbook(response, symbol = "btc") {
    const bids = response[symbol].bids;
    const asks = response[symbol].asks;
    return { bids, asks };
  },
};
