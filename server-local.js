"use strict";

import dotenv from "dotenv";
dotenv.config();

import _app from "./api/index.js";

const app = _app();
app.listen(4000, () => console.log("http://localhost:4000"));
