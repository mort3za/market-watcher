"use strict";

require("dotenv").config();

const app = require("./api/index")();

app.listen(4000, () => console.log("http://localhost:4000"));
