"use strict";
const cors = require("cors");
const isProduction = process.env.NODE_ENV === "production";
const fastify = require("fastify")({
  logger: !isProduction
});
fastify.use(cors());
fastify.options("*", (request, reply) => {
  reply.send();
});

const serverless = require("serverless-http");
const { routeCompare } = require("./routes/compare");

fastify.get("/", async (request, reply) => {
  return { app: "running" };
});

const start = async () => {
  try {
    await fastify.listen(3000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();

fastify.get("/compare", routeCompare);

// app.use("/.netlify/functions/server", router); // path must route to lambda function
// app.use("/", (req, res) => res.sendFile(path.join(__dirname, "../index.html")));

module.exports = fastify;
module.exports.handler = serverless(fastify);
