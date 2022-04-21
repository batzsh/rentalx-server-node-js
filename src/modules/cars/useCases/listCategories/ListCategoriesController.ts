import { Request, Response } from "express";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

export class ListCategoriesController {
  constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}

  async handle(request: Request, response: Response) {
    const all = await this.listCategoriesUseCase.execute();

    return response.status(200).json(all);
  }
}
