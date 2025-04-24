import { NextFunction, Request, Response } from "express";
import { env } from "../../env.js";
import { cookieOptions } from "../constants/cookieOptions.js";
import { STATUS_CODE } from "../constants/status-codes.constants.js";
import { ApiError } from "../utils/api-error.js";
import { AsyncHandler } from "../utils/async-handler.js";
import jwt from "jsonwebtoken";

class AuthMiddlewares {
  verifyAccessToken = AsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      // GET ACCESS TOKEN FROM COOKIES OR HEADERS
      // IF NOT FOUND THEN RESET THE TOKEN AND ASK THE USER TO LOGIN
      // IF TOKEN EXISTS THEN CHECK THE EXPIRY
      // IF EXPIRED THEN RESET COOKIE AND THROW ERROR AND ASK THE CLIENT THE ENDPOINT TO REFRESH ACCESS TOKEN
      // IF NOT EXPIRED THEN GET USER FROM DB WITH THE HELP OF _id FROM THE DECODED TOKEN
      // IF USER DOESNOT EXIST THEN THROW ERROR AND RESET TOKEN
      // IF USER EXISTS THEN SET THE USER IS req.user AND NEXT

      const accessToken =
        req.cookies["access-token"] ??
        (req.headers?.Authorization as string | undefined)?.replace(
          "Bearer ",
          "",
        );

      if (!accessToken) {
        res.clearCookie("access-token");
        res.clearCookie("refresh-token");
        throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
      }

      // const decodedToken = jwt.verify(accessToken, env.ACCESS_TOKEN_SECRET);

      // if (!decodedToken || !decodedToken._id) {
      //   res.clearCookie("access-token");
      //   res.clearCookie("refresh-token");
      //   throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
      // }

      // const user = await UserModel.findById(decodedToken._id).lean();

      // if (!user) {
      //   res.clearCookie("access-token");
      //   throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
      // }

      // if (decodedToken.exp < Date.now() / 1000) {
      //   throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
      // }

      // req.user = user;

      return next();
    },
  );
}

const { verifyAccessToken } = new AuthMiddlewares();
export { verifyAccessToken };
