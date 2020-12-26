const routes = async function routes(fastify, options) {
  fastify.get("/", async (request, reply) => {
    const { name = "World" } = request.query;
    request.log.info({ name }, "hello world!");
    return `Hello ${name}!`;
  });
};

export default routes;
