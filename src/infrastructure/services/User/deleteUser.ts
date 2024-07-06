import { IUsersRepository } from '@application/repositories/User';
import { DeleteUserUseCase } from '@application/useCases/User/implementations/DeleteUser';

import { UserRepository } from '@infrastructure/repositories/User';
import { prismaClient } from "@infrastructure/databases/connection";

import { IController } from "@presentation/http/controllers/IController";
import { DeleteUserController } from '@presentation/http/controllers/User/implementations/DeleteUser';


/**
 * Composer function for creating and configuring the components required for user delete.
 *
 * @function
 * @returns {IController} The configured user delete controller.
 */

export function userDeleteComposer(): IController {
  const repository: IUsersRepository = new UserRepository(prismaClient);
  const useCase: DeleteUserUseCase = new DeleteUserUseCase(repository);
  const controller: IController = new DeleteUserController(useCase);
  return controller
}