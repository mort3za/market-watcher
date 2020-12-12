import axios from "axios";
import { errorHandler } from "./request-error-handler.js";

const _ajax = axios.create({
  timeout: 9000,
  // withCredentials should be here and moving it to default headers wont work
  withCredentials: false,
});

_ajax.defaults.headers = {
  "Content-Type": "application/json",
};

export const ajax = async (configs) => {
  try {
    const result = await _ajax(configs);
    return result.data;
  } catch (error) {
    return errorHandler(error);
  }
};
