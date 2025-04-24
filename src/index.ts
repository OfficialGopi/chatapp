import http from "http";
import { env } from "./env";
import type { Application } from "express";
import { logger } from "./logger";
import { createApp } from "./app";

async function main(createApp: () => Application) {
  try {
    // IMPORTING PORT
    const PORT: number = Number(env.PORT) ?? 8080;

    //CREATING SERVER
    const server = http.createServer(createApp());

    //LISTEN TO PORT NO
    server.listen(PORT, () => {});
  } catch (err) {
    logger.info("");
    process.exit(1);
  }
}

main(createApp);
