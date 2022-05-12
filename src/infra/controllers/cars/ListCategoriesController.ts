import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCategoriesUseCase } from "@domains/cars/usecases/ListCategoriesUseCase";

export class ListCategoriesController {
  async handle(request: Request, response: Response) {
    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);

    const all = await listCategoriesUseCase.execute();

    return response.status(200).json(all);
  }
}
