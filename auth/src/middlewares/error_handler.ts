import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom_error";
//The purpose of this function is to ensure for consistency in all errors from the microservice
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({
      errors: err.serializeErrors(),
    });
  }

  res.status(400).send({
    errors: [
      {
        //message: err.message
        message: "Something went wrong",
      },
    ],
  });
};
