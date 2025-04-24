import type { NextFunction, Request, Response } from "express";

type IRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => void;

function AsyncHandler(requestHandler: IRequestHandler) {
  return function (req: Request, res: Response, next: NextFunction) {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => {
      next(err);
    });
  };
}

export { AsyncHandler };
