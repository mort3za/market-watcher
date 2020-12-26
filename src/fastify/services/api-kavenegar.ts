// SMS API
// https://kavenegar.com/rest.html
import { ajax } from "../utils/ajax";
const API_KEY_KAVENEGAR = process.env.API_KEY_KAVENEGAR;
const SENDER = process.env.KAVENEGAR_NOTIFY_SENDER;
const base_url = `https://api.kavenegar.com/v1/${API_KEY_KAVENEGAR}`;

export async function sendMessage({ text, receptors }) {
  return ajax({
    method: "GET",
    url: `${base_url}/sms/sendon`,
    params: {
      message: text,
      sender: SENDER,
      receptor: receptors,
    },
  });
}

export default {
  sendMessage,
};
