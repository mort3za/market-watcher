const { latest_trades, latest_orderbooks } = require("../services/trading-tools.js").service;
const { sendNotifications } = require("../services/notifiers.js").service;
const { analyze } = require("../services/analyzers.js").service;
const { toTextMultiline } = require("../services/formatter-report.js").service;

exports.watch = async (request, reply) => {
  let result;
  try {
    // const orders = await latest_trades();
    // const { hasGold, goldItems } = await analyze({ orders });
    const orders = await latest_orderbooks();
    const { hasGold, goldItems } = await analyze({ orders });
    
    if (hasGold) {
      goldItems.forEach((goldItem) => {
        const textReport = toTextMultiline(goldItem);
        console.log('textReport', textReport);
        
        sendNotifications({ telegram: true, text: textReport });
      });
    }
    result = { error: false, data: { hasGold } };
  } catch (error) {
    console.log('error', error);
    result = onError(reply, error);
  }
  return reply.send(result);

  function onError(res, error) {
    reply.status(400);
    return { error: true, data: error };
  }
};
