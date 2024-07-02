import { IUsersRepository } from "@application/repositories/User";
import { IUpdateUserUseCase } from "@application/useCases/User/UpdateUser";
import { UpdateUserUseCase } from "@application/useCases/User/implementations/UpdateUser";
import { IPasswordHasher } from "@application/providers/PasswordHasher";

import { prismaClient } from "@infrastructure/databases/connection";
import { PasswordHasher } from "@infrastructure/providers/PasswordHasher";

import { IController } from "@presentation/http/controllers/IController";
import { UpdateUserController } from "@presentation/http/controllers/User/implementations/UpdateUser";

import { UserRepository } from "../../repositories/User";



/**
 * Composer function for getting and configuring the components required for updating user.
 *
 * @function
 * @returns {IController} The configured update user controller.
 */


export function updateUserComposer(): IController {
  const repository: IUsersRepository = new UserRepository(prismaClient);
  const passwordHasher: IPasswordHasher = new PasswordHasher();
  const useCase: IUpdateUserUseCase = new UpdateUserUseCase(repository, passwordHasher);
  const controller: IController = new UpdateUserController(useCase);
  return controller
}