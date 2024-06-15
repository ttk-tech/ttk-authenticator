import { IUsersRepository } from '../../application/repositories/User'
import { IPasswordHasher } from '../../application/providers/PasswordHasher';
import { ICreateUserUseCase } from '../../application/useCases/CreateUser';

export function createUserComposer() {
  const repository: IUsersRepository = new UserRepository(prismaClient)
  // const passwordHasher: IPasswordHasher = new PasswordHasher()
  const useCase: ICreateUserUseCase = new CreateUserUseCase(repository, passwordHasher)
  const controller: IController = new CreateUserController(useCase)
  return controller
}