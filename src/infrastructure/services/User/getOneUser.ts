import { IController } from '@presentation/http/controllers/IController';
import { GetOneUserController } from '@presentation/http/controllers/User/implementations/GetOneUser';

import { IUsersRepository } from '@application/repositories/User';
import { IGetOneUserUseCase } from '@application/useCases/User/GetOneUser';
import { GetOneUserUseCase } from '@application/useCases/User/implementations/GetOneUser';

import { UserRepository } from '../../repositories/User';
import { prismaClient } from '../../databases/connection';


/**
 * Composer function for getting and configuring the components required for getting user.
 *
 * @function
 * @returns {IController} The configured get one user controller.
 */

export function getOneUserComposer(): IController {
  const repository: IUsersRepository = new UserRepository(prismaClient)
  const useCase: IGetOneUserUseCase = new GetOneUserUseCase(repository)
  const controller: IController = new GetOneUserController(useCase)
  return controller
}