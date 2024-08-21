
import { TokenManager } from '@infrastructure/providers/TokenManager'
import { UserRepository } from '@infrastructure/repositories/User'
import { RefreshTokenRepository } from '@infrastructure/repositories/RefreshToken'
import { PasswordHasher } from '@infrastructure/providers/PasswordHasher'


import { IPasswordHasher } from '@application/providers/PasswordHasher'
import { ITokenManagerProvider } from "@application/providers/TokenManager"
import { IRefreshTokenRepository } from '@application/repositories/RefreshToken'
import { IUsersRepository } from '@application/repositories/User'
import { IAuthenticateUserUseCase } from '@application/useCases/Authenticate/AuthenticateUser'
import { AuthenticateUserUseCase } from '@application/useCases/Authenticate/implementations/AuthenticateUser';

import { IController } from '@presentation/http/controllers/IController'
import { AuthenticateUserController } from '@presentation/http/controllers/Authenticate/AuthenticateUser'
import { prismaClient } from '../../databases/connection'


/**
 * Composer function for creating and configuring the components required for the user authentication flow.
 *
 * @function
 * @returns {IController} The configured authentication controller.
 */

export function authenticateUserComposer(): IController {
  const userRepository: IUsersRepository = new UserRepository(prismaClient)
  const refreshTokenRepository: IRefreshTokenRepository = new RefreshTokenRepository(prismaClient)
  const passwordHasher: IPasswordHasher = new PasswordHasher()
  const tokenManagerProvider: ITokenManagerProvider = new TokenManager()
  const useCase: IAuthenticateUserUseCase = new AuthenticateUserUseCase(
    userRepository,
    refreshTokenRepository,
    passwordHasher,
    tokenManagerProvider,
  )
  const controller: IController = new AuthenticateUserController(useCase)
  return controller
}
