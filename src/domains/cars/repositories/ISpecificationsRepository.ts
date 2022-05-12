import { Specification } from "@infra/repositories/entities/SpecificationEntity";

export interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

export interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecificationDTO): Promise<void>;
  findByName(name: string): Promise<Specification>;
}
