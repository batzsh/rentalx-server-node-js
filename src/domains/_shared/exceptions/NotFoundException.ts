import { AppException } from "@application/exceptions/AppException";

export class NotFoundException extends AppException {
  private static readonly CODE = "not_found_exception";

  constructor(message = "Not found") {
    super(404, NotFoundException.CODE, message);
  }
}
