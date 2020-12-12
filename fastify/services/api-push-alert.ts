import { ajax } from "../utils/ajax";
import qs from "qs";
const API_KEY_PUSHALERT = process.env.API_KEY_PUSHALERT;
const base_url = `https://api.pushalert.co/rest/v1`;

export async function sendMessage({ title, text }) {
  const data = qs.stringify({
    title,
    message: text,
    url: "https://google.com",
  });

  return await ajax({
    method: "post",
    url: `${base_url}/send`,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `api_key=${API_KEY_PUSHALERT}`,
    },
    data,
  });
}

export default { sendMessage };
