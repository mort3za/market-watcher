const { compare } = require("../utils/compare");

exports.routeCompare = async (request, reply) => {
  let result;
  try {
    result = await compare();

    return result.data;
  } catch (error) {
    onError(reply, error);
  }

  function onError(res, error) {
    reply.code(400);
    return { error: true, data: error };
  }
};
