import express from "express";
import { register as registerExamples } from "../routes/example/routes";

function v1() {
  const router = express.Router();

  // ================= VERSION 1 ROUTES ===================

  router.use("/example", registerExamples());

  return router;
}

export { v1 };
