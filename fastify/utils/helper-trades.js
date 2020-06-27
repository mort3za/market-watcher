const { irt_to_usd } = require("../services/convertors.js").service;

exports.biggerThan = (orders, price = 0) => {
  const result = orders.filter((trade) => trade.price * trade.size > price);
  return result;
};

exports.addPriceUSD = async (orders) => {
  return await Promise.all(
    orders.map(async (trade) => {
      trade.price_usd = await irt_to_usd(trade.price);
      return trade;
    })
  );
};

exports.addTotalPriceUSD = async (orders) => {
  return await Promise.all(
    orders.map(async (trade) => {
      trade.total_price_usd = await irt_to_usd(trade.total_price);
      return trade;
    })
  );
};

exports.filterIneffectivePrices = (
  orders,
  basedOnProperty = "total_price_usd",
  amount = 300
) => {
  return orders.filter((item) => item[basedOnProperty] > amount);
};

exports.filterIneffectiveDates = (orders, basedOnProperty = "timestamp") => {
  const now = new Date().getTime();
  const TWO_HOUR = 2 * 3600000;
  return orders.filter((item) => now - item[basedOnProperty] < TWO_HOUR);
};
