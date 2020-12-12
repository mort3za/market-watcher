// https://apidocs.nobitex.ir/#6528ce0c42
// symbols: BTCIRT، ETHIRT، LTCIRT، XRPIRT، BCHIRT، BNBIRT، EOSIRT، XLMIRT، ETCIRT،‌ TRXIRT ،USDTIRT، BTCUSDT، ETHUSDT، LTCUSDT، XRPUSDT، BCHUSDT، BNBUSDT، EOSUSDT، XLMUSDT، ETCUSDT، TRXUSDT
import { ajax } from "../utils/ajax.js";
const base_url = "https://api.nobitex.ir";

export async function fetch_token({ username, password, remember = "yes" }) {
  return ajax({
    method: "POST",
    // NOTE: NEEDS IRANIAN IP
    url: `${base_url}/auth/login/`,
    data: { username, password, remember },
    headers: {
      // 'X-TOTP': 123456
    },
  });
}

export async function fetch_orderbooks(symbol = "BTCIRT") {
  return ajax({
    method: "POST",
    url: `${base_url}/v2/orderbook`,
    data: {
      symbol,
    },
  });
  // exampleResponse = {
  //   status: "ok",
  //   bids: [
  //     ["1476091000", "1.016"],
  //     ["1479700000", "0.2561"],
  //   ],
  //   asks: [
  //     ["1470001120", "0.126571"],
  //     ["1470000000", "0.818994"],
  //   ],
  // };
}

export async function fetch_trades(symbol = "BTCIRT") {
  // NOTE: max 15req/min
  return ajax({
    method: "POST",
    url: `${base_url}/v2/trades`,
    data: {
      symbol,
    },
  });
  // exampleResponse = {
  //   status: "ok",
  //   trades: [
  //     {
  //       time: 1588689375067,
  //       price: "1470000110",
  //       volume: "0",
  //       type: "sell",
  //     },
  //     {
  //       time: 1588689360464,
  //       price: "1470000110",
  //       volume: "0.002",
  //       type: "buy",
  //     },
  //   ],
  // };
}

export async function fetch_stats(srcCurrency = "btc", dstCurrency = "rls") {
  return ajax({
    method: "POST",
    url: `${base_url}/market/stats`,
    data: {
      srcCurrency,
      dstCurrency,
    },
  });
  // exampleResponse = {
  //   stats: {
  //     "btc-rls": {
  //       bestSell: "749976360.0000000000",
  //       isClosed: false,
  //       dayOpen: "686021860.0000000000",
  //       dayHigh: "750350000.0000000000",
  //       bestBuy: "733059600.0000000000",
  //       volumeSrc: "0.2929480000",
  //       dayLow: "686021860.0000000000",
  //       latest: "750350000.0000000000",
  //       volumeDst: "212724856.0678640000",
  //       dayChange: "9.38",
  //       dayClose: "750350000.0000000000",
  //     },
  //   },
  //   status: "ok",
  // };
}

export async function fetch_status_global() {
  return ajax({
    method: "POST",
    url: `${base_url}/market/global-stats`,
  });
  // exampleResponse = {
  //   ltc: {
  //     kraken: {
  //       price: "41.69",
  //     },
  //   },
  //   btc: {
  //     kraken: {
  //       price: "5517.2",
  //     },
  //   },
  //   status: "ok",
  // };
}

export async function fetch_profile() {
  return ajax({
    method: "GET",
    url: `${base_url}/users/profile`,
    headers: {
      Authorization: `Token ${process.env.TOKEN_NOBITEX}`,
    },
  });
}

export default {
  fetch_token,
  fetch_orderbooks,
  fetch_trades,
  fetch_stats,
  fetch_status_global,
  fetch_profile,
};
