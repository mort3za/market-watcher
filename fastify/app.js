// https://lambda-twatcher.netlify.com/.netlify/functions/server/watch
// https://pr-twatcher.netlify.app/.netlify/functions/server/watch

/*

                                   +--------+-------------------+------------------+
                                   ^        |                   |                  |
+---------------+                  |        |                   |                  |
| app.js        |    +-------------+---+  +-v--------------+  +-v---------------+ +v------------------+
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
const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { watch } = require("./routes/watch.js");

const app = express();
const router = express.Router();
router.get("/", (request, reply) => reply.json({ hello: "world!" }).end());
router.get("/watch", watch);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/.netlify/functions/app", router); // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
