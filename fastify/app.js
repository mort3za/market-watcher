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
const express = require('express');
const { watch } = require("./routes/watch.js");

function init() {
  const app = express();
  app.get('/', (request, reply) => reply.json({ hello: 'world' }));
  app.get("/watch", watch);
  return app;
}

module.exports = init;

// if (require.main === module) {
//   // called directly i.e. "node app"
//   init().listen(4000, (err) => {
//     if (err) console.error(err);
//     console.log('server listening on 4000');
//   });
// } else {
//   // required as a module => executed on aws lambda
//   module.exports = init;
// }
 
