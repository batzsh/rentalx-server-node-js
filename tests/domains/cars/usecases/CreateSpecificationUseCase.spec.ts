import { SpecificationsRepositoryMock } from "@tests/infra/mocks/repositories/SpecificationRepositoryMock";
import { Specification } from "@infra/repositories/entities/SpecificationEntity";

import { CreateSpecificationUseCase } from "@domains/cars/usecases/CreateSpecificationUseCase";

import { SpecificationAlreadyExistsException } from "@domains/cars/exceptions/SpecificationAlreadyExistsException";

let createSpecificationUseCase: CreateSpecificationUseCase;
let specificationsRepositoryMock: SpecificationsRepositoryMock;

describe("Create Specification", () => {
  beforeEach(() => {
    specificationsRepositoryMock = new SpecificationsRepositoryMock();
    createSpecificationUseCase = new CreateSpecificationUseCase(specificationsRepositoryMock);
  });

  it("Should be able to create a new specification", async () => {
    const specification = {
      name: "Specification Test",
      description: "Specification description test"
    };

    await createSpecificationUseCase.execute({
      name: specification.name,
      description: specification.description
    });

    const specificationCreated = await specificationsRepositoryMock.findByName(specification.name);

    expect(specificationCreated).toHaveProperty("id");
    expect(specificationCreated.name).toBe(specification.name);
    expect(specificationCreated.description).toBe(specification.description);
    expect(specificationCreated).toBeInstanceOf(Specification);
  });

  it("Should not be able to create a new specification with name already registered", async () => {
    expect(async () => {
      const specification = {
        name: "Specification Test",
        description: "Specification description test"
      };

      await createSpecificationUseCase.execute({
        name: specification.name,
        description: specification.description
      });

      await createSpecificationUseCase.execute({
        name: specification.name,
        description: specification.description
      });
    }).rejects.toBeInstanceOf(SpecificationAlreadyExistsException);
  });
});
