import { get_usd_irt_rate } from "../services/api-tgju.js";

export async function irt_to_usd(irt = 0) {
  const rate = await get_usd_irt_rate();
  return irt / rate;
}

export function irr_to_irt(irr = 0) {
  return irr / 10;
}
