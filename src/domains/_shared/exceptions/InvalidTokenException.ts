import { AppException } from "@application/exceptions/AppException";

export class InvalidTokenException extends AppException {
  private static readonly CODE = "invalid_token_exception";

  constructor(message = "Invalid token") {
    super(401, InvalidTokenException.CODE, message);
  }
}
