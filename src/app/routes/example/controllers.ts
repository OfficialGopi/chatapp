import { STATUS_CODE } from "../../constants/status-codes.constants";
import { ApiResponse } from "../../utils/api-response";
import { AsyncHandler } from "../../utils/async-handler";

class ExampleControllers {
  getExample = AsyncHandler((req, res, next) => {
    return res
      .status(STATUS_CODE.OK)
      .json(new ApiResponse(STATUS_CODE.OK, {}, "Hello"));
  });
}

export { ExampleControllers };
