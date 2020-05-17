const { get_usd_tmn } = require("../services/api-tgju.js").service;

async function tmn_to_usd(tmn = 0) {
  const rate = await get_usd_tmn();
  return tmn / rate;
}

const service = {
  tmn_to_usd,
};

exports.service = service;
