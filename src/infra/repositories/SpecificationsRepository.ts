import { getRepository, Repository } from "typeorm";

import { Specification } from "./entities/SpecificationEntity";
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository
} from "@domains/cars/repositories/ISpecificationsRepository";

export class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      description,
      name
    });

    await this.repository.save(specification);
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ name });

    return specification!;
  }
}
