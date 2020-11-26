const { get } = require("lodash");

exports.adapter = {
  trades(values = []) {
    return values.map((value) => {
      return {
        apiName: "exir",
        type: value.side,
        amount: value.size,
        price: value.price,
        total_price: value.price * value.size,
        timestamp: new Date(value.timestamp).getTime(),
      };
    });
  },

  orderbook(response, symbol = "btc-irt") {
    const bids = get(response, "[symbol].bids", []);
    const asks = get(response, "[symbol].asks", []);
    const now = new Date().getTime();

    let bidsConverted = bids.map((value) => {
      return {
        apiName: "exir",
        type: "buy",
        price: value[0],
        amount: value[1],
        total_price: value[0] * value[1],
        timestamp: now,
      };
    });
    let asksConverted = asks.map((value) => {
      return {
        apiName: "exir",
        type: "sell",
        price: value[0],
        amount: value[1],
        total_price: value[0] * value[1],
        timestamp: now,
      };
    });

    return [...bidsConverted, ...asksConverted];
  },
};
