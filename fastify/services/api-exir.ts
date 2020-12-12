// https://apidocs.exir.io/#public
import { ajax } from "../utils/ajax.js";
const base_url = "https://api.exir.io/v1";

// ticker is last price traded
export async function fetch_ticker(symbol = "btc-irt") {
  return ajax({
    method: "GET",
    url: `${base_url}/ticker`,
    params: {
      symbol,
    },
  });
  // exampleResponse = {
  //   ticker: 50000000,
  // };
}

export async function fetch_orderbooks(symbol = "btc-irt") {
  return ajax({
    method: "GET",
    url: `${base_url}/orderbooks`,
    params: {
      symbol,
    },
  });
  // exampleResponse = {
  //   timestamp: "2018-03-02T21:36:52.345Z",
  //   btc: {
  //     bids: [
  //       [52110000, 0.0007],
  //       [51950000, 0.0024],
  //       [51450000, 0.03],
  //       [51020000, 0.0805],
  //       [51010000, 0.0606],
  //       [51005000, 0.01],
  //       [51000000, 0.0746],
  //       [50770000, 0.0024],
  //       [50000000, 0.0004],
  //       [49500000, 0.01],
  //     ],
  //     asks: [
  //       [52985000, 0.0002],
  //       [52995000, 0.0376],
  //       [53000000, 0.11],
  //       [53190000, 0.0051],
  //       [53400000, 0.0006],
  //       [53700000, 0.01],
  //       [53940000, 0.0005],
  //       [53955000, 0.0001],
  //       [54000000, 0.2],
  //       [55000000, 0.0948],
  //     ],
  //     timestamp: "2018-03-02T21:36:29.395Z",
  //   },
  // };
}

export async function fetch_trades(symbol = "btc-irt") {
  return ajax({
    method: "GET",
    url: `${base_url}/trades`,
    params: {
      symbol,
    },
  });
  // exampleResponse = {
  //   btc: [
  //     {
  //       size: 0.0008,
  //       price: 45500000,
  //       side: "buy",
  //       timestamp: "2018-03-23T04:00:20.744Z",
  //     },
  //     {
  //       size: 0.0005,
  //       price: 45500000,
  //       side: "buy",
  //       timestamp: "2018-03-23T03:32:38.927Z",
  //     },
  //     {
  //       size: 0.0031,
  //       price: 44490000,
  //       side: "sell",
  //       timestamp: "2018-03-23T03:13:42.361Z",
  //     },
  //   ],
  // };
}

export default {
  fetch_orderbooks,
  fetch_trades,
  fetch_ticker,
};
