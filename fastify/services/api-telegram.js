import { ajax } from "../utils/ajax.js";
const API_KEY_TELEGRAM = process.env.API_KEY_TELEGRAM;

export const service = {
  base_url: `https://api.telegram.org/bot${API_KEY_TELEGRAM}`,

  async sendMessage({ text, chat_id }) {
    return ajax({
      method: "GET",
      url: `${this.base_url}/sendMessage`,
      params: {
        parse_mode: "HTML",
        text,
        chat_id,
      },
    });
  },
};
