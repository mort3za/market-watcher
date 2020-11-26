const { round, capitalize, get, isNumber } = require("lodash");

exports.service = {
  buySellToTextMultiline(currency, { buyItem, sellItem, percentDiff }) {
    const totalPriceMin = Math.min(buyItem.total_price, sellItem.total_price);
    const importanceEmoji =
      percentDiff > 2 ? "🔥".repeat(parseInt(percentDiff)) : "";

    return (
      `<b>${currency.toUpperCase()}</b>\n` +
      `${sellItem.apiName}: ${_moneyFormatter(sellItem.price)}\n` +
      `${buyItem.apiName}: ${_moneyFormatter(buyItem.price)}\n` +
      `Amount: ${_moneyFormatter(totalPriceMin)}\n` +
      `Difference is ${round(percentDiff, 3)}%\n` +
      `${importanceEmoji}`
    );
  },

  currencyPricePairsToTextMultiline({ exchange, currencyPricePairs = [] }) {
    let pairsText = "";
    currencyPricePairs.forEach((pair) => {
      const price = get(pair, "trade.price");
      if (price) {
        pairsText += `${pair.symbol.toUpperCase()}: ${_moneyFormatter(
          price
        )}\n`;
      }
    });

    return (
      `${_getExchangeEmoji(exchange)} <b>${capitalize(exchange)}</b>\n\n` +
      pairsText
    );
  },
};

function _getExchangeEmoji(exchange) {
  return (
    {
      exir: "🥂",
      nobitex: "🥩",
    }[exchange] || "🔘"
  );
}

function _moneyFormatter(value) {
  if (!isNumber(value)) {
    return null;
  }
  return new Intl.NumberFormat("en-US", {}).format(value.toFixed(0));
}
