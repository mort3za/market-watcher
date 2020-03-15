const { latestTrades } = require("../services/trading-tools.js").service;
const { sendNotifications } = require('../services/notifiers.js').service;

exports.watch = async (request, reply) => {
  let result;
  try {
    result = await latestTrades();
    await sendNotifications({ latestTrades: result });
  } catch (error) {
    result = onError(reply, error);
  }
  return result;

  function onError(res, error) {
    reply.code(400);
    return { error: true, data: error };
  }
};
