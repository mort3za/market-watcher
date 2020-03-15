exports.biggerThan = (trades, price = 0) => {
  const result = trades.filter(trade => trade.price * trade.size > price);
  return result;
};
