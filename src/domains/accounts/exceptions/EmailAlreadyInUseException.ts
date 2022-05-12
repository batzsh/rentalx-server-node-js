import { AppException } from "@application/exceptions/AppException";

export class EmailAlreadyInUseException extends AppException {
  private static readonly CODE = "email_already_in_use_exception";

  constructor(message = "This email is already in use") {
    super(400, EmailAlreadyInUseException.CODE, message);
  }
}
