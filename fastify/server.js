// https://lambda-twatcher.netlify.com/.netlify/functions/server/watch
// https://pr-twatcher.netlify.app/.netlify/functions/server/watch

/*

                                   +--------+-------------------+------------------+
                                   ^        |                   |                  |
+---------------+                  |        |                   |                  |
| Server.js     |    +-------------+---+  +-v--------------+  +-v---------------+ +v------------------+
+---------------+    | Watch.js        |  | trading tools  |  | Analyzers       | | Notifiers         |
|               |    +-----------------+  +----------------+  +-----------------+ +-------------------+
| /watch ----------> |                 |  |                |  |                 | |                   |
|               |    | watch()         |  | latestTrades() |  | analyze         | | sendNotifications |
|               |    |                 |  |                |  |                 | |                   |
|               |    |                 |  |                |  |                 | |                   |
|               |    |                 |  |                |  |                 | |                   |
|               |    +-----------------+  |                |  +-----------------+ +-------------------+
|               |                         |                |
|               |                         |                |
+---------------+                         |                |
                                          |                |
                                          +-+--------------+
                                            |
                                            |
                                            |
                                          +-v--------------+
                                          | api Exir       |
                                          +----------------+
                                          | api Nobitex    |
                                          +----------------+
                                          | api ...        |
                                          +----------------+
                                          |                |
                                          |                |
                                          +----------------+


*/

"use strict";
const cors = require("cors");
// const isProduction = process.env.NODE_ENV === "production";
// const log = require("pino")({
//   level: "info",
//   prettyPrint: true,
// });

// const fastifyOptions = {
//   logger: !isProduction ? log : false,
// };
const fastifyOptions = {};
const fastify = require("fastify")(fastifyOptions);
fastify.use(cors());
fastify.options("*", (request, reply) => {
  reply.send();
});

const serverless = require("serverless-http");
const { watch } = require("./routes/watch.js");

fastify.get("/", async (request, reply) => {
  return { app: "running" };
});

const start = async () => {
  try {
    console.log('before listen');
    await fastify.listen(4000);
    console.log('after listen');
    
  } catch (err) {
    console.log('catch listen');
    fastify.log.error(err);
    process.exit(1);
  }
};
start();

fastify.get("/watch", watch);

// app.use("/.netlify/functions/server", router); // path must route to lambda function

module.exports = fastify;
module.exports.handler = serverless(fastify);
