import { get } from "lodash";
import { irr_to_irt } from "../services/convertors";

export const adapter = {
  trades(values = []) {
    return values.map((value) => {
      // rial to toman
      const price = irr_to_irt(value.price);
      return {
        apiName: "nobitex",
        type: value.type,
        amount: value.volume,
        price,
        timestamp: new Date(value.time).getTime(),
        total_price: price * value.volume,
      };
    });
  },

  orderbook(response, { symbolSrc, symbolDst }): OrderbookItem[] {
    const bids = get(response, "bids", []);
    const asks = get(response, "asks", []);
    const now = new Date().getTime();

    let bidsConverted: OrderbookItem[] = bids.map((value) => {
      const obItem: OrderbookItem = {
        apiName: "nobitex",
        type: "sell",
        price: irr_to_irt(value[0]),
        amount: value[1],
        total_price: irr_to_irt(value[0] * value[1]),
        timestamp: now,
      };
      return obItem;
    });
    let asksConverted: OrderbookItem[] = asks.map((value) => {
      const obItem: OrderbookItem = {
        apiName: "nobitex",
        type: "buy",
        price: irr_to_irt(value[0]),
        amount: value[1],
        total_price: irr_to_irt(value[0] * value[1]),
        timestamp: now,
      };
      return obItem;
    });

    return [...bidsConverted, ...asksConverted];
  },
};
