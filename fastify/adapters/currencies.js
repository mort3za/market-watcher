const dictionary = {
  btc: ["bitcoin", "btc"],
  tmn: ["toman", "tooman", "toomaan", "tmn"]
};

exports.adapter = {
  name(currency) {
    for (const [key, value] of Object.entries(dictionary)) {
      if (value.includes(currency.toLowerCase())) {
        return key;
      }
    }
    return "no-match";
  }
};
