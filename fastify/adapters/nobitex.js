const currencies = require("./currencies.js").adapter;

exports.adapter = {
  trades(values, symbol) {
    return values.map((value) => {
      return {
        amount: value.size,
        price: value.price,
        type: value.side,
        timestamp: new Date(value.timestamp).getTime(),
        total_price: value.price * value.size,
        source_currency: currencies.name(symbol.split("-")[0]),
        destination_currency: currencies.name(symbol.split("-")[1]),
      };
    });
  },

  orderbook(response) {
    const bids = response.bids;
    const asks = response.asks;
    return { bids, asks };
  },
};
