import { CategoriesRepositoryMock } from "@tests/infra/mocks/repositories/CategoriesRepositoryMock";

import { Category } from "@infra/repositories/entities/CategoryEntity";

import { CreateCategoryUseCase } from "@domains/cars/usecases/CreateCategoryUseCase";
import { ListCategoriesUseCase } from "@domains/cars/usecases/ListCategoriesUseCase";

let listCategoriesUseCase: ListCategoriesUseCase;
let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryMock: CategoriesRepositoryMock;

describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepositoryMock = new CategoriesRepositoryMock();
    listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepositoryMock);
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryMock);
  });

  it("Should be able to list all categories", async () => {
    const category = {
      name: "Category Test",
      description: "Category description test"
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    });

    const all = await listCategoriesUseCase.execute();

    expect(all[0]).toHaveProperty("id");
    expect(all[0]).toBeInstanceOf(Category);
    expect(all.length).toBeGreaterThan(0);
  });
});
