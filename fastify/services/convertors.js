const { get_usd_tmn_rate } = require("../services/api-tgju.js").service;

async function tmn_to_usd(tmn = 0) {
  const rate = await get_usd_tmn_rate();
  return tmn / rate;
}

function irr_to_tmn(irr = 0) {
  return irr / 10;
}

const service = {
  // TODO: CHANGE TMN TO IRT (RENAME ONLY)
  tmn_to_usd,
  irr_to_tmn,
};

exports.service = service;
