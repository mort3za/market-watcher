// serverless for vercel: https://www.fastify.io/docs/latest/Serverless/#vercel
"use strict";

import fastify from "fastify";
import { watch as diffWatchRoute } from "../fastify/routes/watch.js";
import { priceList as priceListRoute } from "../fastify/routes/priceList.js";

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

export default build;
