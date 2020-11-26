const {
  // latest_trades,
  latest_orderbooks,
} = require("../services/trading-tools.js").service;
const { sendNotifications } = require("../services/notifiers.js").service;
const { analyze } = require("../services/analyzers.js").service;
const {
  buySellToTextMultiline,
} = require("../services/formatter-report.js").service;
// const SMS_THRESHOLD_PERCENT = process.env.SMS_THRESHOLD_PERCENT;
const PUSH_THRESHOLD_PERCENT = process.env.PUSH_THRESHOLD_PERCENT;
const { round } = require("lodash");

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

    // just for web response
    const maxPercentDiffAll = analizeResults.reduce((max, current) => {
      if (current.maxPercentDiff > max) {
        return current.maxPercentDiff;
      }
      return max;
    }, 0);

    analizeResults.forEach((item) => {
      if (item.hasGold) {
        targetCurrencies.push(item.currency);
        foundAnyTarget = true;
      }
      _handleNotificationsDetails(item);
    });
    _handleNotificationsSummary({
      foundAnyTarget,
      targetCurrencies,
      maxPercentDiffAll,
    });

    result = {
      error: false,
      data: { targetCurrencies, foundAnyTarget, maxPercentDiffAll },
    };
  } catch (error) {
    console.log("error", error);
    result = onError(reply, error);
  }
  return reply.send(result);

  function onError(res, error) {
    // note: 200 is because of preventing false down status in uptimerobot
    reply.status(200);
    return { error: true, data: error };
  }
};

function _handleNotificationsDetails({ hasGold, targetTrades, currency }) {
  if (hasGold) {
    targetTrades.forEach((targetTrade) => {
      const textReport = buySellToTextMultiline(currency, targetTrade);
      sendNotifications({ telegram: true, text: textReport });
    });
  }
}

function _handleNotificationsSummary({
  foundAnyTarget,
  targetCurrencies,
  maxPercentDiffAll,
}) {
  if (foundAnyTarget) {
    const maxPercentDiffAllPercent = `${round(maxPercentDiffAll, 2)}%`;

    if (maxPercentDiffAll > parseFloat(PUSH_THRESHOLD_PERCENT)) {
      const pushTextReport = targetCurrencies.join(", ");
      sendNotifications({
        push: true,
        title: `Watcher ${maxPercentDiffAllPercent}`,
        text: pushTextReport,
      });
    }

    // different report for SMS
    /*
    if (maxPercentDiff > parseFloat(SMS_THRESHOLD_PERCENT)) {
      const smsTextReport = `واچر: ${targetCurrencies.join(
        ", "
      )} - ${maxPercentDiffAllPercent}%`;

      sendNotifications({
        telegram: false,
        sms: true,
        text: smsTextReport,
      });
    }
    */
  }
}
