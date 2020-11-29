// SMS API
// https://kavenegar.com/rest.html
import { ajax } from "../utils/ajax.js";
const API_KEY_KAVENEGAR = process.env.API_KEY_KAVENEGAR;
const SENDER = process.env.KAVENEGAR_NOTIFY_SENDER;

export const service = {
  base_url: `https://api.kavenegar.com/v1/${API_KEY_KAVENEGAR}`,

  async sendMessage({ text, receptors }) {
    return ajax({
      method: "GET",
      url: `${this.base_url}/sms/send.json`,
      params: {
        message: text,
        sender: SENDER,
        receptor: receptors,
      },
    });
  },
};
