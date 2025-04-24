import { z } from "zod";
import dotenv from "dotenv";
import { logger } from "./logger";

// Load environment variables from a .env file into process.env
dotenv.config({
  path: "./.env",
});

// ========= MAKING ENV SCHEMA ===========
const envSchema = z.object({
  NODE_ENV: z.string().default("development"),
  PORT: z.string(),
  DATABASE_URL: z.string(),
  ORIGIN: z.string(),
  BASE_URL: z.string(),
  MAILTRAP_HOST: z.string(),
  MAILTRAP_PORT: z.string(),
  MAILTRAP_USER: z.string(),
  MAILTRAP_PASSWORD: z.string(),
  MAILTRAP_SENDER_EMAIL: z.string(),
  ACCESS_TOKEN_SECRET: z.string(),
  ACCESS_TOKEN_EXPIRY: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_EXPIRY: z.string(),
});

// This function is used to create a parsed environment variable object
function createEnv(env: NodeJS.ProcessEnv) {
  const parsedEnv = envSchema.safeParse(env);
  //=====   If Parsing is not successful, log the error and exit the process  =====

  if (!parsedEnv.success) {
    logger.error(
      `## INVALID ENVIRONMENT VARIABLES PARSING :  ${parsedEnv.error.message}   ##`,
    );

    process.exit(1);
  }

  //=====   If Parsing is successful, log the parsed environment variables  =====
  return parsedEnv.data;
}

// This function is used to create a parsed environment variable object
const env = createEnv(process.env);

export { env };
