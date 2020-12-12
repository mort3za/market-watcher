// serverless for vercel: https://www.fastify.io/docs/latest/Serverless/#vercel
"use strict";

import build from "./index";

const app = build();

export default async function (req, res) {
  await app.ready();
  app.server.emit("request", req, res);
}
