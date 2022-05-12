import { AppException } from "@application/exceptions/AppException";

export class SpecificationAlreadyExistsException extends AppException {
  private static readonly CODE = "specification_already_exists_exception";

  constructor(message = "Specification already exists") {
    super(400, SpecificationAlreadyExistsException.CODE, message);
  }
}
