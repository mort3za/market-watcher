import { sendNotifications } from "../services/notifiers";
import { latest_trades } from "../services/priceDiff";
import { currencyPricePairsToTextMultiline } from "../services/formatter-report";
import { groupBy, sortBy, flatten } from "lodash";
const {
  TELEGRAM_PRICES_CHANNEL_CHAT_ID,
  CURRENCIES_ACTIVE,
  CURRENCIES_STABLE,
} = process.env;

const routes = async function routes(fastify, options) {
  fastify.get("/priceList", async (request, reply) => {
    let result;
    try {
      const price_list_promises = [];
      const notifications_promises = [];
      const exchanges = ["nobitex", "exir"];
      for (const exchange of exchanges) {
        let { pairs, notifications } = await _handlePriceList(exchange);

        price_list_promises.push(pairs);
        notifications_promises.push(notifications);
      }

      await Promise.all(flatten(notifications_promises));
      let price_list = await Promise.all(price_list_promises);
      price_list = groupBy(flatten(price_list), "symbolSrc");

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
  });
};

async function _handlePriceList(exchange) {
  const symbolsActive = CURRENCIES_ACTIVE?.split(",");
  const symbolsStable = CURRENCIES_STABLE?.split(",");
  const trades = [];

  // btc, eth, ...
  symbolsActive.forEach((symbolActive) => {
    // usdt, irt
    symbolsStable.forEach((symbolStable) => {
      trades.push(
        latest_trades(symbolActive, symbolStable, { exchanges: [exchange] })
      );
    });
  });
  const tradesResponse = await Promise.all(trades);
  const pairs = [];

  tradesResponse.forEach((trade) => {
    const _trade = sortBy(trade[exchange], [
      "timestamp",
      "total_price",
    ]).reverse()[0];

    if (_trade) {
      pairs.push({
        symbolSrc: trade.symbolSrc,
        symbolDst: trade.symbolDst,
        trade: _trade,
      });
    }
  });

  return { pairs, notifications: _handleNotification({ pairs, exchange }) };
}

function _handleNotification({ pairs, exchange }) {
  const textReport = currencyPricePairsToTextMultiline({
    exchange,
    currencyPricePairs: pairs,
  });
  return sendNotifications({
    telegram: true,
    telegram_chat_id: TELEGRAM_PRICES_CHANNEL_CHAT_ID,
    text: textReport,
  });
}

export default routes;
