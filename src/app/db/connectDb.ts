import { env } from "../../env.js";
import { logger } from "../../logger.js";

const connectDB = async () => {
  try {
    //connect to mongodb

    //=>HERE CONNECT DATABASE

    logger.info("========= MONGODB CONNECTION SUCCESSFUL =========");
  } catch (err) {
    //Handling error while connecting db
    logger.error(`## MONGODB CONNECTION ERROR : ${err}  ##`);
    process.exit(1); // Exit if connection fails
  }
};

export { connectDB };
