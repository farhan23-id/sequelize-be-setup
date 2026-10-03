require("dotenv").config({ quiet: true });

const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  return res.status(200).json({
    message: "Node.js REST API Part 3",
    data: null,
  });
});

app.use("/api", routes);

app.use((error, _req, res, _next) => {
  console.error(error);

  return res.status(500).json({
    message: "Internal server error",
    data: null,
  });
});

module.exports = app;
