import { inject, injectable } from "tsyringe";

import { ISpecificationsRepository } from "../repositories/ISpecificationsRepository";
import { SpecificationAlreadyExistsException } from "../exceptions/SpecificationAlreadyExistsException";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlreadyExists = await this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new SpecificationAlreadyExistsException();
    }

    await this.specificationsRepository.create({
      name,
      description
    });
  }
}
