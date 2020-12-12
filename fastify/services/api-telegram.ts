import { ajax } from "../utils/ajax.js";
const API_KEY_TELEGRAM = process.env.API_KEY_TELEGRAM;

const base_url = `https://api.telegram.org/bot${API_KEY_TELEGRAM}`;

export async function sendMessage({ text, chat_id }) {
  return ajax({
    method: "GET",
    url: `${base_url}/sendMessage`,
    params: {
      parse_mode: "HTML",
      text,
      chat_id,
    },
  });
}

export default {
  sendMessage,
};
