import { AppException } from "@application/exceptions/AppException";

export class CategoryAlreadyExistsException extends AppException {
  private static readonly CODE = "category_already_exists_exception";

  constructor(message = "Category already exists") {
    super(400, CategoryAlreadyExistsException.CODE, message);
  }
}
