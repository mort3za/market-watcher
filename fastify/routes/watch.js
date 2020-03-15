const { latestTrades } = require("../services/trading-tools.js").service;
const { sendNotifications } = require("../services/notifiers.js").service;
const { analyze } = require("../services/gold-extractor.js").service;
const { toTextMultiline } = require("../services/report-formatter.js").service;

exports.watch = async (request, reply) => {
  let result;
  try {
    const trades = await latestTrades();
    const { hasGold, report } = await analyze({ trades });
    if (hasGold) {
      const textReport = toTextMultiline(report);
      await sendNotifications({ telegram: true, text: textReport });
    }
    result = { error: false, data: { hasGold } };
  } catch (error) {
    result = onError(reply, error);
  }
  return result;

  function onError(res, error) {
    reply.code(400);
    return { error: true, data: error };
  }
};
