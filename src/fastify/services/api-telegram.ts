import { ajax } from "../utils/ajax";
const API_KEY_TELEGRAM = process.env.API_KEY_TELEGRAM;

const base_url = `https://api.telegram.org/bot${API_KEY_TELEGRAM}`;

export function sendMessage({ text, chat_id }) {
  return ajax({
    method: "GET",
    url: `${base_url}/sendMessage`,
    params: {
      parse_mode: "HTML",
      text,
      chat_id,
    },
  }).then((res) => {
    // console.log("Telegram response", res);
    return res;
  });
}

export default {
  sendMessage,
};
