const currencies = require("./currencies.js").adapter;

exports.adapter = {
  trades(values, symbol) {
    console.log('symbol', symbol);
    
    return values.map(value => {
      return {
        amount: value.size,
        price: value.price,
        type: value.side,
        timestamp: new Date(value.timestamp).getTime(),
        totalPrice: value.price * value.size,
        sourceCurrency: currencies.name(symbol.split("-")[0]),
        destinationCurrency: currencies.name(symbol.split("-")[1])
      };
    });
  }
};
