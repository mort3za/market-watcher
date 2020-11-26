// serverless for vercel: https://www.fastify.io/docs/latest/Serverless/#vercel
"use strict";

const fastify = require("fastify");
const watchRoute = require("../fastify/routes/watch.js").watch;
const priceListNobitex = require("../fastify/routes/priceList.js")
  .priceListNobitex;

function build() {
  const app = fastify({
    logger: true,
  });

  app.get("/", async (req, res) => {
    const { name = "World" } = req.query;
    req.log.info({ name }, "hello world!");
    return `Hello ${name}!`;
  });

  app.get("/watch", watchRoute);
  app.get("/priceListNobitex", priceListNobitex);

  return app;
}

module.exports = build;
