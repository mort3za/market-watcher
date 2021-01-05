import serviceExir from "../components/exchanges/exir/api-exir";
import { addPriceUSD, addTotalPriceUSD } from "../utils/helper-trades";
import { adapter as adapterExir } from "../components/exchanges/exir/adapter";

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

// exir, trades
export async function get_exir_trades_filtered(
  symbolSrc: string,
  symbolDst: string
) {
  let result;
  try {
    result = await serviceExir.fetch_trades({ symbolSrc, symbolDst });
    result = adapterExir.trades(result, symbolDst);
  } catch (error) {
    throw error;
  }

  result = await addPriceUSD(result);
  result = await addTotalPriceUSD(result);
  return result;
}
