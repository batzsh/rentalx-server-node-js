import { Specification } from "../../../src/modules/cars/entities/Specification";
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository
} from "../../../src/modules/cars/repositories/ISpecificationsRepository";

export class SpecificationsRepositoryMock implements ISpecificationsRepository {
  specifications: Specification[] = [];

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = new Specification();

    Object.assign(specification, { name, description });

    this.specifications.push(specification);
  }

  async findByName(name: string): Promise<Specification> {
    const specification = this.specifications.find((specification) => specification.name === name);

    return specification!;
  }
}
