const { tmn_to_usd } = require("../services/convertors.js").service;

exports.biggerThan = (trades, price = 0) => {
  const result = trades.filter((trade) => trade.price * trade.size > price);
  return result;
};

exports.addPriceUSD = async (trades) => {
  return await Promise.all(
    trades.map(async (trade) => {
      trade.price_usd = await tmn_to_usd(trade.price);
      return trade;
    })
  );
};

exports.addTotalPriceUSD = async (trades) => {
  return await Promise.all(
    trades.map(async (trade) => {
      trade.total_price_usd = await tmn_to_usd(trade.total_price);
      return trade;
    })
  );
};

exports.filterIneffectivePrices = (
  trades,
  basedOnProperty = "total_price_usd",
  amount = 300
) => {
  return trades.filter((item) => item[basedOnProperty] > amount);
};

exports.filterIneffectiveDates = (trades, basedOnProperty = "timestamp") => {
  const now = new Date().getTime();
  const TWO_HOUR = 2 * 3600000;
  return trades.filter((item) => now - item[basedOnProperty] < TWO_HOUR);
};
