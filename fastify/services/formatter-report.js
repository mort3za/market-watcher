const datefns = require("date-fns");
const datefnsTz = require("date-fns-tz");
const { round } = require("lodash");

exports.service = {
  toTextMultiline(currency, { buyItem, sellItem, percentDiff }) {
    const totalPriceMin = Math.min(buyItem.total_price, sellItem.total_price);
    const importanceEmoji =
      percentDiff > 2 ? "🔥".repeat(parseInt(percentDiff)) : "";

    return (
      `<b>${currency.toUpperCase()}</b>\n` +
      `${sellItem.apiName}: ${_moneyFormatter(sellItem.price)}\n` +
      `${buyItem.apiName}: ${_moneyFormatter(buyItem.price)}\n` +
      `Amount: ${_moneyFormatter(totalPriceMin)}\n` +
      `Difference is ${round(percentDiff, 3)}%\n` +
      `<code>${datefns.format(
        datefnsTz.utcToZonedTime(buyItem.timestamp, _getUserTimeZone()),
        "MM/dd kk:mm"
      )}</code>\n` +
      `${importanceEmoji}`
    );
  },
};

function _getUserTimeZone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

function _moneyFormatter(value) {
  return new Intl.NumberFormat("en-US", {}).format(value);
}
