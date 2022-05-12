import { User } from "@infra/repositories/entities/UserEntity";

import { ICreateUserDTO } from "@domains/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@domains/accounts/repositories/IUsersRepository";

export class UsersRepositoryMock implements IUsersRepository {
  users: User[] = [];

  async create({ name, email, driver_license, password }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, { name, email, driver_license, password });

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);

    return user!;
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);

    return user!;
  }
}
