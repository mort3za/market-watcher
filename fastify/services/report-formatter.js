exports.service = {
  toTextMultiline({ buyItem, sellItem, percentDiff }) {
    const totalPriceMin = Math.min(buyItem.total_price, sellItem.total_price);
    return `
    Buy from ${sellItem.apiName} ${sellItem.price.toFixed(0)}\n
    Sell to ${buyItem.apiName} ${buyItem.price.toFixed(0)}\n
    You can trade at least ${totalPriceMin.toFixed(0)}\n
    Difference is ${percentDiff.toFixed(2)}%
    `;
  },
};
