"use strict";
const express = require("express");
var cors = require("cors");
const path = require("path");
const serverless = require("serverless-http");
const app = express();
const bodyParser = require("body-parser");
const { routeCompare } = require("./routes/compare");

const router = express.Router();
router.get("/", (req, res) => {
  res.json({ app: "running" });
  res.end();
});

router.get("/compare", routeCompare);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/.netlify/functions/server", router); // path must route to lambda function
app.use("/", (req, res) => res.sendFile(path.join(__dirname, "../index.html")));

module.exports = app;
module.exports.handler = serverless(app);
