const { sendNotifications } = require("../services/notifiers.js").service;
const {
  latest_trades,
  // latest_orderbooks,
} = require("../services/trading-tools.js").service;
const {
  currencyPricePairsToTextMultiline,
} = require("../services/formatter-report.js").service;
const { sortBy } = require("lodash");

exports.priceListNobitex = async (request, reply) => {
  let result;
  try {
    const symbolsActive = process.env.CURRENCIES_ACTIVE.split(",");

    const trades = [];
    symbolsActive.forEach((symbol) => {
      trades.push(latest_trades(symbol, "irt", { exchanges: ["nobitex"] }));
    });
    const tradesResponse = await Promise.all(trades);
    const pairs = [];
    tradesResponse.forEach((trade) => {
      pairs.push({
        symbol: trade.symbol,
        // todo: make this general, not just for nobitex (move to a fn)
        trade: sortBy(trade.nobitex, ["timestamp", "total_price"]).reverse()[0],
      });
    });

    _handleNotification({ pairs, exchange: "nobitex" });

    result = {
      error: false,
      data: { trades },
    };
  } catch (error) {
    console.log("error", error);
    result = onError(reply, error);
  }
  return reply.send(result);

  function onError(res, error) {
    reply.status(400);
    return { error: true, data: error };
  }
};

function _handleNotification({ pairs, exchange }) {
  const textReport = currencyPricePairsToTextMultiline({
    exchange,
    currencyPricePairs: pairs,
  });
  sendNotifications({
    telegram: true,
    telegram_chat_id: process.env.TELEGRAM_PRICES_NOBITEXT_CHAT_ID,
    text: textReport,
  });
}
