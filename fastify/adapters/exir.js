const currencies = require("./currencies.js").adapter;

exports.adapter = {
  trades(values) {
    return values.map((value) => {
      return {
        apiName: "exir",
        type: value.side,
        amount: value.size,
        price: value.price,
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
