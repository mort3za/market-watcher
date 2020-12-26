import { addHours, isBefore } from "date-fns";
// import { ajax } from "../utils/ajax";

// base_url: "https://tgju.org",
// TODO: add real USD api
export async function get_usd_irt_rate() {
  const last_update = new Date(global.app_tgju_last_update_ms || 0);
  const now = new Date();
  const one_hour_ago = addHours(now, -1);

  if (isBefore(last_update, one_hour_ago)) {
    global.app_tgju_last_update_ms = now.getTime();
    // todo: on scaling, this should be moved to redis
    global.app_tgju_rate_usd_irt = parseFloat(process.env.USD_STATIC_PRICE);
  }
  return global.app_tgju_rate_usd_irt;
}
