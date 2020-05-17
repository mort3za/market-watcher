// https://apidocs.exir.io/#public
const { ajax } = require("../utils/ajax.js");

exports.service = {
  base_url: "https://api.exir.io/v0",
  async ticker(symbol = "btc-tmn") {
    return ajax({
      method: "GET",
      url: `${this.base_url}/ticker`,
      params: {
        symbol
      }
    });
  },
  async orderbooks(symbol = "btc-tmn") {
    return ajax({
      method: "GET",
      url: `${this.base_url}/orderbooks`,
      params: {
        symbol
      }
    });
  },
  async trades(symbol = "btc-tmn") {
    return ajax({
      method: "GET",
      url: `${this.base_url}/trades`,
      params: {
        symbol
      }
    });
  }
};
