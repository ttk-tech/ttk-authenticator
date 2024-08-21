import { ITokenManagerProvider } from '@application/providers/TokenManager';
import { IRefreshTokenRepository } from '@application/repositories/RefreshToken'
import { IRefreshTokenUserUseCase } from '@application/useCases/Authenticate/RefreshTokenUser';
import { RefreshTokenUserUseCase } from '@application/useCases/Authenticate/implementations/RefreshTokenUser';

import { RefreshTokenRepository } from '@infrastructure/repositories/RefreshToken'
import { prismaClient } from '@infrastructure/databases/connection'
import { TokenManager } from '@infrastructure/providers/TokenManager';


import { RefreshTokenUserController } from '@presentation/http/controllers/Authenticate/RefreshTokenUser'
import { IController } from '@presentation/http/controllers/IController'


export function refreshTokenUserComposer(): IController {
  const refreshTokenRepository: IRefreshTokenRepository = new RefreshTokenRepository(prismaClient)
  const tokenManager: ITokenManagerProvider = new TokenManager()
  const useCase: IRefreshTokenUserUseCase = new RefreshTokenUserUseCase(refreshTokenRepository, tokenManager)
  const controller: IController = new RefreshTokenUserController(useCase)
  return controller
}