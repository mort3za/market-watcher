const currencies = require("./currencies.js").adapter;
const { irr_to_tmn } = require("../services/convertors.js").service;

exports.adapter = {
  trades(values) {
    return values.map((value) => {
      // rial to toman
      const price = irr_to_tmn(value.price);
      return {
        apiName: 'nobitex',
        type: value.type,
        amount: value.volume,
        price,
        timestamp: new Date(value.time).getTime(),
        total_price: price * value.volume,
      };
    });
  },

  orderbook(response) {
    const bids = response.bids;
    const asks = response.asks;
    return { bids, asks };
  },
};
