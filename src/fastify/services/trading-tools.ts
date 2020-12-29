import serviceExir from "./api-exir";
import serviceNobitex from "./api-nobitex";
import {
  addPriceUSD,
  addTotalPriceUSD,
  // filterIneffectivePrices,
  // filterIneffectiveDates,
} from "../utils/helper-trades";
import { adapter as adapterCurrencies } from "../adapters/currencies";
import { adapter as adapterExir } from "../adapters/exir";
import { adapter as adapterNobitex } from "../adapters/nobitex";

// ---------------------------------------------------------------------------------
// private functions
// ---------------------------------------------------------------------------------

// exir, orderbooks
export async function get_exir_orderbook_filtered(
  symbolSrc: string,
  symbolDst: string
) {
  let result;
  try {
    result = await serviceExir.fetch_orderbooks({ symbolSrc, symbolDst });
    result = adapterExir.orderbook(result, { symbolSrc, symbolDst });
  } catch (error) {
    throw error;
  }

  result = await addPriceUSD(result);
  result = await addTotalPriceUSD(result);

  return result;
}

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

// exir, trades
export async function get_exir_trades_filtered(
  symbolSrc: string,
  symbolDst: string
) {
  let result;
  try {
    result = await serviceExir.fetch_trades({ symbolSrc, symbolDst });
    result = adapterExir.trades(result);
  } catch (error) {
    throw error;
  }

  result = await addPriceUSD(result);
  result = await addTotalPriceUSD(result);
  // console.log('exir items count:', result.length);

  // result = await filterIneffectivePrices(result);
  // result = await filterIneffectiveDates(result);

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
  result = adapterNobitex.trades(result);
  // TODO: move to adapter nobitex
  result = await addPriceUSD(result);
  result = await addTotalPriceUSD(result);
  // console.log('nobitex items count:', result.length);

  // result = await filterIneffectivePrices(result);
  // result = await filterIneffectiveDates(result);

  return result;
}
