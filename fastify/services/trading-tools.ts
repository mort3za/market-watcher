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
export async function get_exir_orderbook_filtered(src: string, dst: string) {
  const symbol = adapterCurrencies.exchangeSymbol(src, dst, "a-b");

  let result;
  try {
    result = await serviceExir.fetch_orderbooks(symbol);
    result = adapterExir.orderbook(result, symbol);
  } catch (error) {
    throw error;
  }

  result = await addPriceUSD(result);
  result = await addTotalPriceUSD(result);

  return result;
}

export async function get_nobitex_orderbook_filtered(src: string, dst: string) {
  const symbol = adapterCurrencies.exchangeSymbol(src, dst, "AB");

  let result;
  try {
    result = await serviceNobitex.fetch_orderbooks(symbol);
    result = adapterNobitex.orderbook(result, symbol);
  } catch (error) {
    throw error;
  }

  result = await addPriceUSD(result);
  result = await addTotalPriceUSD(result);

  return result;
}

export async function get_exir_trades_filtered(src: string, dst: string) {
  const symbol = adapterCurrencies.exchangeSymbol(src, dst, "a-b");
  let result;
  try {
    result = await serviceExir.fetch_trades(symbol);
    result = result[symbol];
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

export async function get_nobitex_trades_filtered(src, dst) {
  const symbol = adapterCurrencies.exchangeSymbol(src, dst, "AB");
  let result;
  try {
    result = await serviceNobitex.fetch_trades(symbol);
    result = result.trades;
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
