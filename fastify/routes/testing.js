exports.testing = async (request, reply) => {
  try {
    return reply.send({ error: false, data: 1 });
  } catch (error) {
    console.log("error", error);
  }
};
