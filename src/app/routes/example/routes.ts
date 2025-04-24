import express from "express";
import type { Router } from "express";
import { ExampleControllers } from "./controllers";

function register(): Router {
  const router = express.Router();

  const exampleControllers = new ExampleControllers();

  router.route("/").get(exampleControllers.getExample.bind(exampleControllers));

  return router;
}

export { register };
