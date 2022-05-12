import { inject, injectable } from "tsyringe";

import { hash } from "bcrypt";

import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUsersRepository } from "../repositories/IUsersRepository";

import { EmailAlreadyInUseException } from "../exceptions/EmailAlreadyInUseException";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) {}

  async execute({ name, email, driver_license, password }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new EmailAlreadyInUseException();
    }

    const passwordHash = await hash(password, 8);

    await this.userRepository.create({
      name,
      email,
      driver_license,
      password: passwordHash
    });
  }
}
