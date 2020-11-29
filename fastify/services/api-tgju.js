import datefns from "date-fns";
// import { ajax } from "../utils/ajax.js";

export const service = {
  // base_url: "https://tgju.org",
  // TODO: add real USD api
  async get_usd_irt_rate() {
    const last_update = new Date(global.app_tgju_last_update_ms || 0);
    const now = new Date();
    const one_hour_ago = datefns.addHours(now, -1);
    if (datefns.isBefore(last_update, one_hour_ago)) {
      global.app_tgju_last_update_ms = now.getTime();
      // on scaling, this should be moved to redis
      global.app_tgju_rate_usd_irt = parseFloat(process.env.USD_STATIC_PRICE);
    }
    return global.app_tgju_rate_usd_irt;
  },
};
