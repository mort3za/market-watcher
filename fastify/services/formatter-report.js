const datefns = require("date-fns");
const datefnsTz = require("date-fns-tz");

exports.service = {
  toTextMultiline({ buyItem, sellItem, percentDiff }) {
    const totalPriceMin = Math.min(buyItem.total_price, sellItem.total_price);
    const importanceEmoji = "🔥".repeat(parseInt(percentDiff));

    return (
      `Buy from ${sellItem.apiName} ${moneyFormatter(sellItem.price)}\n` +
      `Sell to ${buyItem.apiName} ${moneyFormatter(buyItem.price)}\n` +
      `You can trade at least ${moneyFormatter(totalPriceMin)}\n` +
      `Difference is ${percentDiff.toFixed(2)}%\n` +
      `<code>${datefns.format(
        datefnsTz.utcToZonedTime(buyItem.timestamp, "Asia/Tehran"),
        "MM/dd kk:mm"
      )}</code>\n` +
      `${importanceEmoji}`
    );
  },
};

function moneyFormatter(value) {
  return new Intl.NumberFormat("en-US", {}).format(value);
}
