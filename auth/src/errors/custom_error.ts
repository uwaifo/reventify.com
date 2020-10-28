export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string }[];
}

//Here is just a sample implimentation
/*
class NotFoundErrer extends CustomError {
  statusCode = 404;
  message = "ok";

  serializeErrors() {
    return [
      {
        message: this.message,
      },
    ];
  }
}
*/
