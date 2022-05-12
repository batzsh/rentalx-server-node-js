import { CategoriesRepositoryMock } from "@tests/infra/mocks/repositories/CategoriesRepositoryMock";
import { Category } from "@infra/repositories/entities/CategoryEntity";

import { CreateCategoryUseCase } from "@domains/cars/usecases/CreateCategoryUseCase";

import { CategoryAlreadyExistsException } from "@domains/cars/exceptions/CategoryAlreadyExistsException";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryMock: CategoriesRepositoryMock;

describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepositoryMock = new CategoriesRepositoryMock();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryMock);
  });

  it("Should be able to create a new category", async () => {
    const category = {
      name: "Category Test",
      description: "Category description test"
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    });

    const categoryCreated = await categoriesRepositoryMock.findByName(category.name);

    expect(categoryCreated).toHaveProperty("id");
    expect(categoryCreated.name).toBe(category.name);
    expect(categoryCreated.description).toBe(category.description);
    expect(categoryCreated).toBeInstanceOf(Category);
  });

  it("Should not be able to create a new category with name already registered", async () => {
    expect(async () => {
      const category = {
        name: "Category Test",
        description: "Category description test"
      };

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description
      });

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description
      });
    }).rejects.toBeInstanceOf(CategoryAlreadyExistsException);
  });
});
