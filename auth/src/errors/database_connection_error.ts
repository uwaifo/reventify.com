import { ValidationError } from "express-validator";
import { CustomError } from "./custom_error";

//Note that this class really doesnt need to extend the Error base class
export class DatabaseConnectionError extends CustomError {
  //errors: ValidationError[]
  //this.errors = errors;
  statusCode = 500;
  reason = "Error connecting to the database";

  //Flip to private
  constructor() {
    super("Error connecting to database  . . .");

    //Only because we are extending a built in language class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.reason,
      },
    ];
  }
}
