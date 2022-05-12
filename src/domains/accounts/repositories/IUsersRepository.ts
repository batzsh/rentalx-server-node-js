import { User } from "@infra/repositories/entities/UserEntity";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}
