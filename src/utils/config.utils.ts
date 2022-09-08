import * as dotenv from "dotenv";

dotenv.config();

export const config = {
  SECRET: process.env.SECRET || "jdkjdjkdk",
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost/jh",
};
