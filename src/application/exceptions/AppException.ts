export class AppException implements Error {
  statusCode: number;

  name: string;

  message: string;

  stack?: string;

  constructor(statusCode: number, name: string, message: string, stack?: string) {
    this.statusCode = statusCode;
    this.name = name;
    this.message = message;
    this.stack = stack;
  }
}
