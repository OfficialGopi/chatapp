import express from "express";
import type { Router } from "express";
import { HealthControllers } from "./controllers";

function register(): Router {
  const router = express.Router();

  const healthControllers = new HealthControllers();

  router.route("/").get(healthControllers.healthCheck.bind(healthControllers));

  return router;
}

export { register };
