import { ajax } from "../utils/ajax.js";
import qs from "qs";
const API_KEY_PUSHALERT = process.env.API_KEY_PUSHALERT;

export const service = {
  base_url: `https://api.pushalert.co/rest/v1`,

  async sendMessage({ title, text }) {
    const data = qs.stringify({
      title,
      message: text,
      url: "https://google.com",
    });

    return await ajax({
      method: "post",
      url: `${this.base_url}/send`,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: `api_key=${API_KEY_PUSHALERT}`,
      },
      data,
    });
  },
};
