import { inject, injectable } from "tsyringe";

import { Category } from "@infra/repositories/entities/CategoryEntity";
import { ICategoriesRepository } from "../repositories/ICategoriesRepository";

@injectable()
export class ListCategoriesUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list();

    return categories;
  }
}
