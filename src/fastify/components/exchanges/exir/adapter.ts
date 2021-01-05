import { get } from "lodash";
import { adapter as adapterCurrencies } from "../../../adapters/currency-names";

export const adapter = {
  trades(values = []): TradeItem[] {
    return values.map((value) => {
      const trItem: TradeItem = {
        apiName: "exir",
        type: value.side,
        amount: value.size,
        price: value.price,
        total_price: value.price * value.size,
        timestamp: new Date(value.timestamp).getTime(),
      };
      return trItem;
    });
  },

  orderbook(response, { symbolSrc, symbolDst }): OrderbookItem[] {
    const symbolPair = adapterCurrencies.exchangeSymbol(
      symbolSrc,
      symbolDst,
      "a-b"
    );

    const bids = get(response, `[${symbolPair}].bids`, []);
    const asks = get(response, `[${symbolPair}].asks`, []);
    const now = new Date().getTime();

    let bidsConverted: OrderbookItem[] = bids.map((value) => {
      const obItem: OrderbookItem = {
        apiName: "exir",
        type: "buy",
        price: value[0],
        amount: value[1],
        total_price: value[0] * value[1],
        timestamp: now,
      };
      return obItem;
    });
    let asksConverted: OrderbookItem[] = asks.map((value) => {
      const obItem: OrderbookItem = {
        apiName: "exir",
        type: "sell",
        price: value[0],
        amount: value[1],
        total_price: value[0] * value[1],
        timestamp: now,
      };
      return obItem;
    });

    return [...bidsConverted, ...asksConverted];
  },
};
