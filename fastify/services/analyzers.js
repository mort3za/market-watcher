const sortBy = require("lodash/sortBy");

exports.service = {
  analyze({ orders, currency }) {
    // exir
    let buysExir = [];
    let sellsExir = [];
    try {
      buysExir = orders.exir.filter((trade) => trade.type === "buy");
      buysExir = sortBy(buysExir, "price").reverse();

      sellsExir = orders.exir.filter((trade) => trade.type === "sell");
      sellsExir = sortBy(sellsExir, "price");
    } catch (error) {}

    // nobitex
    let buysNobitex = [];
    let sellsNobitex = [];
    try {
      buysNobitex = orders.nobitex.filter((trade) => trade.type === "buy");
      buysNobitex = sortBy(buysNobitex, "price").reverse();

      sellsNobitex = orders.nobitex.filter((trade) => trade.type === "sell");
      sellsNobitex = sortBy(sellsNobitex, "price");
    } catch (error) {}

    const buyExirHead = buysExir[0];
    const buyNobitexHead = buysNobitex[0];
    const sellExirHead = sellsExir[0];
    const sellNobitexHead = sellsNobitex[0];

    // console.log("buyExirHead, buyNobitexHead, sellExirHead, sellNobitexHead");
    // console.log(buyExirHead, buyNobitexHead, sellExirHead, sellNobitexHead);

    let hasGold = false;
    let targetTrades = [];
    const threshold = parseFloat(process.env.TARGET_THRESHOLD_PERCENT);

    if (buyExirHead && sellNobitexHead) {
      const priceDiff = buyExirHead.price - sellNobitexHead.price;
      const percentDiff = (priceDiff / buyExirHead.price) * 100;
      if (percentDiff > threshold) {
        targetTrades.push({
          buyItem: buyExirHead,
          sellItem: sellNobitexHead,
          percentDiff,
        });
        hasGold = true;
      }
    }
    if (buyNobitexHead && sellExirHead) {
      const priceDiff = buyNobitexHead.price - sellExirHead.price;
      const percentDiff = (priceDiff / buyNobitexHead.price) * 100;
      if (percentDiff > threshold) {
        targetTrades.push({
          buyItem: buyNobitexHead,
          sellItem: sellExirHead,
          percentDiff,
        });
        hasGold = true;
      }
    }

    return {
      targetTrades,
      hasGold,
      currency,
      maxPercentDiff: Math.max(targetTrades.map((item) => item.percentDiff)),
    };
  },
};
