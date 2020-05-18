'use strict';

require('dotenv').config()

const app = require('./fastify/app');
console.log('app', app);


app.listen(4000, () => console.log('Local app listening on port 4000!'));
