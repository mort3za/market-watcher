axios = require("axios");
const market1_url = process.env.market1_url;
const { errorHandler } = require("./request-error-handler.js");

exports.compare = async function(body) {
  const data = {};

  try {
    const result = await axios({
      method: "get",
      url: market1_url,
      data,
      headers: {
        "Content-Type": "application/json"
      }
    });
    return { error: false, status: 200, data: result.data };
  } catch (error) {
    throw errorHandler(error);
  }
};
