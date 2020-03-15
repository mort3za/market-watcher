axios = require("axios");
const { errorHandler } = require("./request-error-handler.js");

const ajax = axios.create({
  timeout: 9000,
  // withCredentials should be here and moving it to default headers wont work
  withCredentials: false
});

ajax.defaults.headers = {
  "Content-Type": "application/json"
};

exports.ajax = async configs => {
  try {
    const result = await ajax(configs);
    return result.data;
  } catch (error) {
    return errorHandler(error);
  }
};
