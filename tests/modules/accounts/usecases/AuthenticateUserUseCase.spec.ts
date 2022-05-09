import { UsersRepositoryMock } from "../../../mocks/repositories/UsersRepositoryMock";
import { AuthenticateUserUseCase } from "../../../../src/modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase";
import { CreateUserUseCase } from "../../../../src/modules/accounts/useCases/createUser/CreateUserUseCase";
import { ICreateUserDTO } from "../../../../src/modules/accounts/dtos/ICreateUserDTO";
import { AppError } from "../../../../src/errors/AppError";

let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let usersRepositoryMock: UsersRepositoryMock;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryMock = new UsersRepositoryMock();
    createUserUseCase = new CreateUserUseCase(usersRepositoryMock);
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryMock);
  });

  it("Should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "000123",
      email: "user@test.com",
      name: "User Test",
      password: "1234"
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });

    expect(result).toHaveProperty("token");
  });

  it("Should not be able to authenticate a nonexistent user", async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "inexistent@test.com",
        password: "1234"
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to authenticate with incorrect password", async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: "999999",
        email: "user@test.com",
        name: "User Test Error",
        password: "1234"
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "incorret_password"
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
