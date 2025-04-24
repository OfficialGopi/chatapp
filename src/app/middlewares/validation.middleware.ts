import { VALIDATION_OPTIONS } from "../constants/validationOptions.js";
import { ApiError } from "../utils/api-error.js";
import { AsyncHandler } from "../utils/async-handler.js";

VALIDATION_OPTIONS;

class ValidationMiddleware {
  //Taking ZOD Object schema , error message and what to validate in schema parameter
  validate = (
    schemas: {
      object: Zod.AnyZodObject;
      message: string;
      validationOption: string;
    }[], //SCHEMA CONTAINS ZOD VALIDATION OBJECT ERROR MESSAGE AND VALIDATION DATA OF REQ(PARAMS OR BODY)
  ) =>
    AsyncHandler((req, _, next) => {
      /*
        schemas:[{
          object:ZOD VALIDATION OBJECT,
          message:ERROR MESSAGE STRING,
          validationOption: ONE OF VALIDATAION_OPTIONS(body or params)
        }] 
      */

      //IF VALIDATION OPTION IS NOT "body" or "params" then throw error
      schemas.forEach((schema) => {
        if (
          !Object.values(VALIDATION_OPTIONS).includes(schema.validationOption)
        ) {
          throw new ApiError(500, "Wrong validation object");
        }

        //DESTRUCTERING THE DATA GOT FROOM SAFEPARSING THE DATA THROUGH ZOD OBJECT SCHEMA
        const { success, error, data } = schema.object.safeParse(schema);

        //IF PARSING FAILS THEN ERROR MESSAGE OF SCHEMA
        if (!success) {
          throw new ApiError(400, schema.message, error as never);
        }

        //DATA PUTTING IN VALIDATED DATA ALONG WITH THE DATAS ALREADY WERE IN VALIDATED DATA
        req.validatedData = {
          ...req.validatedData,
          ...data,
        };
      });
      //CALLING next
      return next();
    });
}

//Singleton Concept
const { validate } = new ValidationMiddleware();
export { validate };
