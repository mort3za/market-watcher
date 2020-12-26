type MarketName = "exir" | "nobitex";
type TradeAction = "buy" | "sell";

interface OrderbookItem {
  apiName: MarketName;
  type: TradeAction;
  price: number;
  amount: number;
  total_price: number;
  timestamp: number;
}

interface TradeItem {
  apiName: MarketName;
  type: TradeAction;
  price: number;
  amount: number;
  total_price: number;
  timestamp: number;
}
