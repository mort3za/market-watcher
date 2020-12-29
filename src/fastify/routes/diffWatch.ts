import {
  // latest_trades,
  latest_orderbooks,
} from "../services/priceDiff";
import { sendNotifications } from "../services/notifiers";
import { analyze } from "../services/analyzers";
import { buySellToTextMultiline } from "../services/formatter-report";
// import SMS_THRESHOLD_PERCENT = process.env.SMS_THRESHOLD_PERCENT;
import { flatten, round } from "lodash";
const { PUSH_THRESHOLD_PERCENT } = process.env;

const routes = async function routes(fastify, options) {
  fastify.get("/diffWatch", async (request, reply) => {
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
        const orders = orderbooksResponse.find((item) => {
          return item.symbol === symbol;
        });
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

      let notificationPromises: Promise<Object | undefined>[] = [];
      for (let i = 0; i < analizeResults.length; i++) {
        const item = analizeResults[i];
        if (item.hasGold) {
          targetCurrencies.push(item.currency);
          foundAnyTarget = true;
          notificationPromises.push(..._handleNotificationsDetails(item));
        }
      }
      const _prms = notificationPromises.filter(Boolean);
      // fixme: handle {status: 429, data: {ok:false}} in telegram response.
      await Promise.all(_prms);

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
  });
};

// solo notifications for every item
function _handleNotificationsDetails({
  targetTrades,
  currency,
}): Promise<Object>[] {
  let promises = [];
  targetTrades.forEach(async (targetTrade) => {
    const textReport = buySellToTextMultiline(currency, targetTrade);
    promises.push(sendNotifications({ telegram: true, text: textReport }));
  });
  return flatten(promises);
}

// summary notification
function _handleNotificationsSummary({
  foundAnyTarget,
  targetCurrencies,
  maxPercentDiffAll,
}) {
  if (foundAnyTarget) {
    const maxPercentDiffAllPercent = `${round(maxPercentDiffAll, 2)}%`;
    const shouldSend = maxPercentDiffAll > parseFloat(PUSH_THRESHOLD_PERCENT);
    if (shouldSend) {
      const pushTextReport = targetCurrencies.join(", ");
      // send push notification
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

export default routes;
