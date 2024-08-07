
import { UserRepository } from '../../repositories/User';
import { prismaClient } from '../../databases/connection';

import { IController } from '@presentation/http/controllers/IController';
import { GetAllUserController } from '@presentation/http/controllers/User/implementations/GetAllUser';

import { IUsersRepository } from '@application/repositories/User';
import { IGetAllUserUseCase } from "@application/useCases/User/GetAllUser"
import { GetAllUserUseCase } from "@application/useCases/User/implementations/GetAllUser"


export function getAllUserComposer(): IController {
  const repository: IUsersRepository = new UserRepository(prismaClient)
  const useCase: IGetAllUserUseCase = new GetAllUserUseCase(repository)
  const controller: IController = new GetAllUserController(useCase)
  return controller
}