const { latestTrades } = require("../services/trading-tools.js").service;
const { sendNotifications } = require("../services/notifiers.js").service;
const { analyze } = require("../services/analyzers.js").service;
const { toTextMultiline } = require("../services/report-formatter.js").service;

exports.watch = async (request, reply) => {
  let result;
  try {
    const trades = await latestTrades();
    const { hasGold, goldItems } = await analyze({ trades });
    
    if (hasGold) {
      goldItems.forEach((goldItem) => {
        const textReport = toTextMultiline(goldItem);
        console.log('textReport', textReport);
        
        // sendNotifications({ telegram: true, text: textReport });
      });
    }
    result = { error: false, data: { hasGold } };
  } catch (error) {
    console.log('error', error);
    
    result = onError(reply, error);
  }
  return reply.json(result).end();

  function onError(res, error) {
    reply.status(400);
    return { error: true, data: error };
  }
};
