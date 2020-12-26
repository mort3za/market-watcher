const dictionary = {
  btc: ["bitcoin", "btc"],
  eth: ["eth", "ethereum"],
  xrp: ["xrp", "ripple"],
  xmr: ["xmr", "monero"],
  xlm: ["xlm", "stellar"],
  bch: ["bch", "bitcoin-cash"],
  irt: ["irt", "toman", "tooman", "toomaan", "tuman", "tumaan", "tmn"],
};

export const adapter = {
  normalizeName(currency) {
    let result = "";
    for (const [key, value] of Object.entries(dictionary)) {
      if (value.includes(currency.toLowerCase())) {
        result = key;
      }
    }
    if (!result) {
      result = currency;
    }

    return result;
  },

  formatName(currency, format = "a") {
    switch (format) {
      case "a":
        return currency.toLowerCase();
      case "A":
        return currency.toUpperCase();

      default:
        return currency.toLowerCase();
    }
  },

  // format options: AB, a-b
  exchangeSymbol(source, destination, format) {
    switch (format) {
      case "a-b":
        return `${adapter.normalizeName(source)}-${adapter.normalizeName(
          destination
        )}`;
      case "AB":
        return `${adapter
          .normalizeName(source)
          .toUpperCase()}${adapter.normalizeName(destination).toUpperCase()}`;

      default:
        return `${adapter.normalizeName(source)}-${adapter.normalizeName(
          destination
        )}`;
    }
  },
};
