import { Request, Response, NextFunction, response } from "express";
import { validationResult } from "express-validator";
import { CustomError } from "../errors/custom_error";
import { RequestvalidationError } from "../errors/request_validation_errors";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestvalidationError(errors.array());
  }

  next();
};
