import { irt_to_usd } from "../services/convertors.js";

export const biggerThan = (orders, price = 0) => {
  const result = orders.filter((trade) => trade.price * trade.size > price);
  return result;
};

export const addPriceUSD = async (orders) => {
  return await Promise.all(
    orders.map(async (trade) => {
      trade.price_usd = await irt_to_usd(trade.price);
      return trade;
    })
  );
};

export const addTotalPriceUSD = async (orders) => {
  return await Promise.all(
    orders.map(async (trade) => {
      trade.total_price_usd = await irt_to_usd(trade.total_price);
      return trade;
    })
  );
};

export const filterIneffectivePrices = (
  orders,
  basedOnProperty = "total_price_usd",
  amount = 300
) => {
  return orders.filter((item) => item[basedOnProperty] > amount);
};

export const filterIneffectiveDates = (
  orders,
  basedOnProperty = "timestamp"
) => {
  const now = new Date().getTime();
  const TWO_HOUR = 2 * 3600000;
  return orders.filter((item) => now - item[basedOnProperty] < TWO_HOUR);
};
