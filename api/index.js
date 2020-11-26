// serverless for vercel: https://www.fastify.io/docs/latest/Serverless/#vercel
"use strict";

const fastify = require("fastify");
const diffWatchRoute = require("../fastify/routes/watch.js").watch;
const priceListRoute = require("../fastify/routes/priceList.js").priceList;

function build() {
  const app = fastify({
    logger: true,
  });

  app.get("/", async (req, res) => {
    const { name = "World" } = req.query;
    req.log.info({ name }, "hello world!");
    return `Hello ${name}!`;
  });

  app.get("/diffWatch", diffWatchRoute);
  app.get("/priceList", priceListRoute);

  return app;
}

module.exports = build;
