const {
  // latest_trades,
  latest_orderbooks,
} = require("../services/trading-tools.js").service;
const { sendNotifications } = require("../services/notifiers.js").service;
const { analyze } = require("../services/analyzers.js").service;
const { toTextMultiline } = require("../services/formatter-report.js").service;

exports.watch = async (request, reply) => {
  let result;
  try {
    const symbolsActive = process.env.CURRENCIES_ACTIVE.split(",");

    const orderbooks = [];
    symbolsActive.forEach((symbol) => {
      orderbooks.push(latest_orderbooks(symbol, "irt"));
    });
    const orderbooksResponse = await Promise.all(orderbooks);

    const analizeResults = [];
    symbolsActive.forEach((symbol) => {
      const orders = orderbooksResponse.find((item) => item.symbol === symbol);
      analizeResults.push(
        analyze({
          currency: symbol,
          orders,
        })
      );
    });

    let foundAnyTarget = false;
    let targetCurrencies = [];
    analizeResults.forEach((item) => {
      _handleNotifications(item);
      if (item.hasGold) {
        targetCurrencies.push(item.currency);
        foundAnyTarget = true;
      }
    });

    result = { error: false, data: { targetCurrencies, foundAnyTarget } };
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

function _handleNotifications({ hasGold, targetTrades, currency }) {
  if (hasGold) {
    targetTrades.forEach((targetTrade) => {
      const textReport = toTextMultiline(currency, targetTrade);
      console.log("textReport", textReport);

      sendNotifications({ telegram: true, text: textReport });
    });
  }
}
