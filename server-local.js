'use strict';

require('dotenv').config()

const app = require('./fastify/server');
const PORT = 4000;

app.listen(PORT, () => console.log(`Local app listening on port ${PORT}!`));
