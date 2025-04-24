import express from "express";
import type { Application } from "express";
import { register as registerHealthRouter } from "./routes/health/routes";
import { v1 } from "./versions/v1.version.js";
import cors from "cors";
import { env } from "../env.js";
import { ErrorMiddleware } from "./middlewares/error.middleware.js";
import { logger } from "../logger.js";
import cookieParser from "cookie-parser";
import { ApiError } from "./utils/api-error.js";

function createApp(): Application {
  const app: Application = express();
  const errorMiddleware = new ErrorMiddleware();
  //======= MIDDLEWARE =======

  // Middleware to handle CORS
  app.use(
    cors({
      origin: env.ORIGIN ?? "http://localhost:5173", // Allow all origins
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
    }),
  );

  // =======   Middleware to handle request body parsing  =====
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  //======= MIDDLEWARE FOR STATIC FILES =======
  app.use(express.static("public"));

  // ======== INCOMING REQUEST CHECKING ========
  app.use((_, __, next) => {
    logger.info("====== INCOMING REQUEST ======");
    next();
  });

  //========= MIDDLEWARE FOR COOKIE PARSING =========
  app.use(cookieParser());

  //======= HEALTH CHECK =======
  app.use("/api/health", registerHealthRouter());

  //======= API VERSIONING =======
  app.use("/api/v1", v1());

  //ALL OTHER ROUTES WHICH ARE NOT AVALABLE
  app.use(() => {
    throw new ApiError(404, "NOT FOUND");
  });

  //======= ERROR MIDDLEWARE =======
  app.use(errorMiddleware.errorMiddleware.bind(errorMiddleware));

  return app;
}

export { createApp };
