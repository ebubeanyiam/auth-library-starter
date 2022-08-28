import mongoose from "mongoose";
import config from "config";
import log from "../utils/logger";

async function connect() {
  const uri = config.get<string>("mongoUri");

  try {
    mongoose.connect(uri);
    log.info("Connected to DB");
  } catch (error) {
    process.exit(1);
  }
}

export default connect;
