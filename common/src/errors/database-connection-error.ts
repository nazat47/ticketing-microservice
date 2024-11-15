import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
  reason = "Error connecting to database";
  statusCode = 500;
  constructor() {
    super("Error connecting to database!");
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);   // not necessary in modern javascripts
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
