import { ValidationError } from "express-validator";
import { CustomError } from "./custom_error";
/*
interface CustomError {
  statusCone: number;
  serializableErrors(): {
    message: string;
    field?: string;
  }[];
}
*/
export class RequestvalidationError extends CustomError {
  //errors: ValidationError[]
  //this.errors = errors;
  statusCode = 400;

  //Flip to private
  constructor(public errors: ValidationError[]) {
    super("Invalid request parameters");

    //Only because we are extending a built in language class
    Object.setPrototypeOf(this, RequestvalidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => {
      return { message: err.msg, field: err.param };
    });
  }
}
