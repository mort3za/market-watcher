// serverless for vercel: https://www.fastify.io/docs/latest/Serverless/#vercel
"use strict";

import fastify from "fastify";
import diffWatchRoutes from "../fastify/routes/diffWatch";
import priceListRoutes from "../fastify/routes/priceList";
import subscribeRoutes from "../fastify/routes/subscribe";
import helloRoutes from "../fastify/routes/hello";

function build() {
  const app = fastify({
    logger: true,
  });

  app.register(helloRoutes, { prefix: "/api" });
  app.register(diffWatchRoutes, { prefix: "/api" });
  app.register(priceListRoutes, { prefix: "/api" });
  app.register(subscribeRoutes, { prefix: "/api" });

  return app;
}

export default build;
