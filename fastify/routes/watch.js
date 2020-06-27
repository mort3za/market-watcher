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
    // const orders = await latest_trades();
    // const { hasGold, targetTrades } = await analyze({ orders });

    const orderbooks = [];
    orderbooks.push(latest_orderbooks("btc", "irt"));
    orderbooks.push(latest_orderbooks("usdt", "irt"));
    const orderbooksResponse = await Promise.all(orderbooks);

    const symbolds = ["btc", "usdt"];
    const analizeResults = [];
    symbolds.forEach((symbol) => {
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
