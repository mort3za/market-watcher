const { irr_to_tmn } = require("../services/convertors.js").service;

exports.adapter = {
  trades(values = []) {
    return values.map((value) => {
      // rial to toman
      const price = irr_to_tmn(value.price);
      return {
        apiName: "nobitex",
        type: value.type,
        amount: value.volume,
        price,
        timestamp: new Date(value.time).getTime(),
        total_price: price * value.volume,
      };
    });
  },

  orderbook(response, symbol = "BTCIRT") {
    const bids = response.bids || [];
    const asks = response.asks || [];
    const now = new Date().getTime();

    let bidsConverted = bids.map((value) => {
      return {
        apiName: "nobitex",
        type: "buy",
        price: irr_to_tmn(value[0]),
        amount: value[1],
        total_price: irr_to_tmn(value[0] * value[1]),
        timestamp: now,
      };
    });
    let asksConverted = asks.map((value) => {
      return {
        apiName: "nobitex",
        type: "sell",
        price: irr_to_tmn(value[0]),
        amount: value[1],
        total_price: irr_to_tmn(value[0] * value[1]),
        timestamp: now,
      };
    });

    return [...bidsConverted, ...asksConverted];
  },
};
