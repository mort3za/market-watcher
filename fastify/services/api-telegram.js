const { ajax } = require("../utils/ajax.js");
const API_KEY_TELEGRAM = process.env.API_KEY_TELEGRAM;

exports.service = {
  base_url: `https://api.telegram.org/bot${API_KEY_TELEGRAM}`,

  async sendMessage({ text, chat_id }) {
    const encodedText = encodeURI(text);
    return ajax({
      method: "GET",
      url: `${this.base_url}/sendMessage`,
      params: {
        text: encodedText,
        chat_id,
      },
    });
  },
};
