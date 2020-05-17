const dictionary = {
  btc: ["bitcoin", "btc"],
  tmn: ["toman", "tooman", "toomaan", "tmn"],
};

const adapter = {
  normalizeName(currency) {
    let result = "";
    for (const [key, value] of Object.entries(dictionary)) {
      if (value.includes(currency.toLowerCase())) {
        result = key;
      }
    }
    return result;
  },

  formatName(currency, format = "a") {
    switch (format) {
      case "a":
        return currency.toLowerCase();
        break;
      case "A":
        return currency.toUpperCase();

      default:
        return currency.toLowerCase();
        break;
    }
  },

  // format options: AB, a-b
  exchangeSymbol(source, destination, format) {
    switch (format) {
      case "a-b":
        return `${adapter.normalizeName(source)}-${adapter.normalizeName(
          destination
        )}`;
        break;
      case "AB":
        return `${adapter
          .normalizeName(source)
          .toUpperCase()}${adapter.normalizeName(destination).toUpperCase()}`;

      default:
        return `${adapter.normalizeName(source)}-${adapter.normalizeName(
          destination
        )}`;
        break;
    }
  },
};

exports.adapter = adapter;
