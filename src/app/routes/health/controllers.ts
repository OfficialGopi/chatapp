import { STATUS_CODE } from "../../constants/status-codes.constants";
import { ApiResponse } from "../../utils/api-response";
import { AsyncHandler } from "../../utils/async-handler";

class HealthControllers {
  healthCheck = AsyncHandler((_, res) => {
    return res
      .status(STATUS_CODE.OK)
      .json(new ApiResponse(STATUS_CODE.OK, {}, "Health Check Successful"));
  });
}

export { HealthControllers };
