require("dotenv").config;

import express from "express";
import config from "config";

import connect from "./services/mongoose.service";
import log from "./utils/logger";
import router from "./routes";

connect();

const app = express();
app.use(express.json());

const port = config.get("port");

app.use("/api", router);

app.listen(port, () => {
  log.info(`App started on port ${port}`);
});
