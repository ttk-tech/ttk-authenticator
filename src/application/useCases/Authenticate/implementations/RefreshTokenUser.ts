import { IRefreshTokenUserDTO } from '@domain/dtos/Authenticate/RefreshTokenUser'
import { ResponseDTO } from '@domain/dtos/Response'
import { RefreshTokenDTO } from '@domain/dtos/Authenticate/RefreshToken'

import { IRefreshTokenUserUseCase } from '@application/useCases/Authenticate/RefreshTokenUser'
import { IRefreshTokenRepository } from '@application/repositories/RefreshToken'
import { ITokenManagerProvider } from '@application/providers/TokenManager'

import { AuthenticateErrorTypes } from '@domain/enums/Authenticate/ErrorType'

import "@config/logging"

export class RefreshTokenUserUseCase implements IRefreshTokenUserUseCase {

  constructor(
    private refreshTokenRepository: IRefreshTokenRepository,
    private tokenManager: ITokenManagerProvider
  ) { }

  async execute({ refreshTokenID }: IRefreshTokenUserDTO): Promise<ResponseDTO> {
    try {
      const refreshToken = await this.refreshTokenRepository.findByID(refreshTokenID) as RefreshTokenDTO

      if (!refreshToken) {
        return { data: { error: AuthenticateErrorTypes.InvalidToken }, success: false }
      }

      const tokenExpired = await this.tokenManager.validateTokenAge(refreshToken.expires_in)
      const token = await this.tokenManager.generateToken(refreshToken.user_id)

      if (!tokenExpired) {
        await this.refreshTokenRepository.delete(refreshToken.user_id)
        const newRefreshToken = await this.refreshTokenRepository.create(refreshToken.user_id)
        return { data: { newRefreshToken, token }, success: true }
      }

      return { data: { token }, success: true }

    } catch (error: any) {
      logging.error(error)
      return { data: { error: error.message }, success: false }
    }
  }
}