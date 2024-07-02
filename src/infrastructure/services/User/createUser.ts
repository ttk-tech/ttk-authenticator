import { IPasswordHasher } from '@application/providers/PasswordHasher';
import { IUsersRepository } from '@application/repositories/User';
import { ICreateUserUseCase } from '@application/useCases/User/CreateUser';
import { CreateUserUseCase } from '@application/useCases/User/implementations/CreateUser';

import { IController } from '@presentation/http/controllers/IController';
import { CreateUserController } from '@presentation/http/controllers/User/implementations/CreateUser';
import { prismaClient } from '../../databases/connection';
import { PasswordHasher } from '../../providers/PasswordHasher';
import { UserRepository } from '../../repositories/User';

/**
 * Composer function for creating and configuring the components required for user creation.
 *
 * @function
 * @returns {IController} The configured user creation controller.
 */

export function createUserComposer(): IController {
  const repository: IUsersRepository = new UserRepository(prismaClient)
  const passwordHasher: IPasswordHasher = new PasswordHasher()
  const useCase: ICreateUserUseCase = new CreateUserUseCase(
    repository,
    passwordHasher,
  )
  const controller: IController = new CreateUserController(useCase)
  return controller
}
