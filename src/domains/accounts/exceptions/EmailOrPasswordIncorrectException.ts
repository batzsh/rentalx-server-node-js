import { AppException } from "@application/exceptions/AppException";

export class EmailOrPasswordIncorrectException extends AppException {
  private static readonly CODE = "email_or_password_incorrect_exception";

  constructor(message = "Email or password incorrect") {
    super(401, EmailOrPasswordIncorrectException.CODE, message);
  }
}
