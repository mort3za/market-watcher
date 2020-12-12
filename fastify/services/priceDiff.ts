import {
  get_exir_trades_filtered,
  get_exir_orderbook_filtered,
  get_nobitex_orderbook_filtered,
  get_nobitex_trades_filtered,
} from "./trading-tools.js";

// trades
export async function latest_trades(
  symbolSrc = "btc",
  symbolDst = "irt",
  { exchanges = ["all"] } = { exchanges: ["all"] }
) {
  let exir = [],
    nobitex = [];
  if (exchanges.includes("all") || exchanges.includes("exir")) {
    exir = await get_exir_trades_filtered(symbolSrc, symbolDst);
  }
  if (exchanges.includes("all") || exchanges.includes("nobitex")) {
    nobitex = await get_nobitex_trades_filtered(symbolSrc, symbolDst);
  }

  const result = {
    symbol: symbolSrc,
    exir,
    nobitex,
  };
  return result;
}

// orderbook
export async function latest_orderbooks(symbolSrc = "btc", symbolDst = "irt") {
  const result = {
    symbol: symbolSrc,
    exir: await get_exir_orderbook_filtered(symbolSrc, symbolDst),
    nobitex: await get_nobitex_orderbook_filtered(symbolSrc, symbolDst),
  };
  return result;
}
