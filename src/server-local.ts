"use strict";

import "./env";
import _app from "./api/index";

const app = _app();
app.listen(4000, () => console.log("http://localhost:4000"));
