import { Category } from "@modules/cars/entities/Category";
import { CreateCategoryUseCase } from "@modules/cars/useCases/createCategory/CreateCategoryUseCase";
import { ListCategoriesUseCase } from "@modules/cars/useCases/listCategories/ListCategoriesUseCase";
import { CategoriesRepositoryMock } from "@mocks/repositories/CategoriesRepositoryMock";

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
