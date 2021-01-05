import serviceNobitex from "../components/exchanges/nobitex/api";
import { addPriceUSD, addTotalPriceUSD } from "../utils/helper-trades";
import { adapter as adapterNobitex } from "../components/exchanges/nobitex/adapter";

// nobitex, orderbooks
export async function get_nobitex_orderbook_filtered(
  symbolSrc: string,
  symbolDst: string
) {
  let result;
  try {
    const orderbooks = await serviceNobitex.fetch_orderbooks({
      symbolSrc,
      symbolDst,
    });
    result = adapterNobitex.orderbook(orderbooks, { symbolSrc, symbolDst });
  } catch (error) {
    throw error;
  }

  result = await addPriceUSD(result);
  result = await addTotalPriceUSD(result);

  return result;
}

// nobitex, trades
export async function get_nobitex_trades_filtered(
  symbolSrc: string,
  symbolDst: string
) {
  let result;
  try {
    result = await serviceNobitex.fetch_trades({ symbolSrc, symbolDst });
  } catch (error) {
    throw error;
  }
  result = adapterNobitex.trades(result, symbolDst);
  // TODO: move to adapter nobitex
  result = await addPriceUSD(result);
  result = await addTotalPriceUSD(result);
  return result;
}
