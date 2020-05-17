const dictionary = {
  btc: ["bitcoin", "btc"],
  tmn: ["toman", "tooman", "toomaan", "tmn", "irt"],
};

const adapter = {
  normalizeName(currency, { useIRT = false } = {}) {
    let result = "";
    for (const [key, value] of Object.entries(dictionary)) {
      if (value.includes(currency.toLowerCase())) {
        result = key;
      }
    }

    // replace tmn with irt
    if (result === "tmn" && useIRT) {
      result = "irt";
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
  exchangeSymbol(source, destination, format, { useIRT = false } = {}) {
    const normalizeOptions = { useIRT };
    switch (format) {
      case "a-b":
        return `${adapter.normalizeName(
          source,
          normalizeOptions
        )}-${adapter.normalizeName(destination, normalizeOptions)}`;
        break;
      case "AB":
        return `${adapter
          .normalizeName(source, normalizeOptions)
          .toUpperCase()}${adapter
          .normalizeName(destination, normalizeOptions)
          .toUpperCase()}`;

      default:
        return `${adapter.normalizeName(
          source,
          normalizeOptions
        )}-${adapter.normalizeName(destination, normalizeOptions)}`;
        break;
    }
  },
};

exports.adapter = adapter;
