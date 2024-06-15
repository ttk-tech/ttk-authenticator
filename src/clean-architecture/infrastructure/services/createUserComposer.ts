import { IUsersRepository } from '../../application/repositories/iUsersRepository'
import { IPasswordHasher } from '../../application/providers/ipasswordHasher';
import { ICreateUserUseCase } from '../../application/useCases/createUserUseCase';

export function createUserComposer() {
  const repository: IUsersRepository = new UserRepository(prismaClient)
  // const passwordHasher: IPasswordHasher = new PasswordHasher()
  const useCase: ICreateUserUseCase = new CreateUserUseCase(repository, passwordHasher)
  const controller: IController = new CreateUserController(useCase)
  return controller
}