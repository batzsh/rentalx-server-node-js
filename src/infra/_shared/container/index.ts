import { container } from "tsyringe";

import { ICategoriesRepository } from "@domains/cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from "@infra/repositories/CategoriesRepository";

import { ISpecificationsRepository } from "@domains/cars/repositories/ISpecificationsRepository";
import { SpecificationsRepository } from "@infra/repositories/SpecificationsRepository";

import { IUsersRepository } from "@domains/accounts/repositories/IUsersRepository";
import { UsersRepository } from "@infra/repositories/UsersRepository";

container.registerSingleton<ICategoriesRepository>("CategoriesRepository", CategoriesRepository);

container.registerSingleton<ISpecificationsRepository>("SpecificationsRepository", SpecificationsRepository);

container.registerSingleton<IUsersRepository>("UsersRepository", UsersRepository);
