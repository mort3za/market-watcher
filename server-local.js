'use strict';

require('dotenv').config()
const app = require('./fastify/app');
console.log('app', app);

app();