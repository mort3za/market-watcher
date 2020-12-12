import { sendNotifications } from "../services/notifiers";
import {
  latest_trades,
  // latest_orderbooks,
} from "../services/priceDiff";
import { currencyPricePairsToTextMultiline } from "../services/formatter-report";
import lodash from "lodash";

export const priceList = async (request, reply) => {
  let result;
  try {
    const price_list_promises = [];
    price_list_promises.push(_handlePriceList("nobitex"));
    price_list_promises.push(_handlePriceList("exir"));

    let price_list = await Promise.all(price_list_promises);
    price_list = lodash.groupBy(lodash.flatten(price_list), "symbol");

    result = {
      error: false,
      data: { price_list },
    };
  } catch (error) {
    console.log("error", error);
    result = onError(reply, error);
  }
  return reply.send(result);

  function onError(res, error) {
    // note: 200 is because of preventing false down status in uptimerobot
    reply.status(200);
    return { error: true, data: JSON.stringify(error) };
  }
};

async function _handlePriceList(exchange) {
  const symbolsActive = process.env.CURRENCIES_ACTIVE.split(",");

  const trades = [];
  symbolsActive.forEach((symbol) => {
    trades.push(latest_trades(symbol, "irt", { exchanges: [exchange] }));
  });
  const tradesResponse = await Promise.all(trades);
  const pairs = [];
  tradesResponse.forEach((trade) => {
    pairs.push({
      symbol: trade.symbol,
      trade: lodash
        .sortBy(trade[exchange], ["timestamp", "total_price"])
        .reverse()[0],
    });
  });

  await _handleNotification({ pairs, exchange });
  return pairs;
}

function _handleNotification({ pairs, exchange }) {
  const textReport = currencyPricePairsToTextMultiline({
    exchange,
    currencyPricePairs: pairs,
  });
  return sendNotifications({
    telegram: true,
    telegram_chat_id: process.env.TELEGRAM_PRICES_CHANNEL_CHAT_ID,
    text: textReport,
  });
}
