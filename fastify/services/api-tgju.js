var isBefore = require("date-fns/isBefore");
var addHours = require("date-fns/addHours");
// const { ajax } = require("../utils/ajax.js");

exports.service = {
  // base_url: "https://tgju.org",
  // TODO: add real USD api
  async get_usd_tmn_rate() {
    const last_update = new Date(global.app_tgju_last_update_ms || 0);
    const now = new Date();
    const one_hour_ago = addHours(now, -1);
    if (isBefore(last_update, one_hour_ago)) {
      global.app_tgju_last_update_ms = now.getTime();
      // on scaling, this should be moved to redis
      global.app_tgju_rate_usd_tmn = 17000;
    }
    return global.app_tgju_rate_usd_tmn;
  },
};
