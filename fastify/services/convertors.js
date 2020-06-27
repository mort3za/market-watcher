const { get_usd_irt_rate } = require("../services/api-tgju.js").service;

async function irt_to_usd(irt = 0) {
  const rate = await get_usd_irt_rate();
  return irt / rate;
}

function irr_to_irt(irr = 0) {
  return irr / 10;
}

const service = {
  irt_to_usd,
  irr_to_irt,
};

exports.service = service;
