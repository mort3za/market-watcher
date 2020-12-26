// serverless for vercel: https://www.fastify.io/docs/latest/Serverless/#vercel
"use strict";

import fastify from "fastify";
import { watch as diffWatchRoute } from "../fastify/routes/watch";
import { priceList as priceListRoute } from "../fastify/routes/priceList";
import { subscribe as subscribeRoute } from "../fastify/routes/subscribe";

function build() {
  const app = fastify({
    logger: true,
  });

  app.get("/api/", async (req, res) => {
    const { name = "World" } = req.query;
    req.log.info({ name }, "hello world!");
    return `Hello ${name}!`;
  });

  app.get("/api/diffWatch", diffWatchRoute);
  app.get("/api/priceList", priceListRoute);
  app.get("/api/subscribe", subscribeRoute);

  return app;
}

export default build;
