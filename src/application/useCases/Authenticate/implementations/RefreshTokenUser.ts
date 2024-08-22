import { IRefreshTokenUserDTO } from '@domain/dtos/Authenticate/RefreshTokenUser'
import { ResponseDTO } from '@domain/dtos/Response'
import { RefreshTokenDTO } from '@domain/dtos/Authenticate/RefreshToken'

import { IRefreshTokenUserUseCase } from '@application/useCases/Authenticate/RefreshTokenUser'
import { IRefreshTokenRepository } from '@application/repositories/RefreshToken'
import { ITokenManagerProvider } from '@application/providers/TokenManager'

import { AuthenticateErrorTypes } from '@domain/enums/authenticate/ErrorType'

import "@config/logging"

/**
 * Use case for refresh token.
 *
 * @class
 * @implements {IRefreshTokenUserUseCase}
 */
export class RefreshTokenUserUseCase implements IRefreshTokenUserUseCase {

  /**
   * Creates an instance of RefreshTokenUserUseCase.
   *
   * @constructor
   * @param {IRefreshTokenRepository} refreshTokenRepository - The repository for refresh token data.
   * @param {ITokenManagerProvider} tokenManager - The token manager hasher provider.
   */
  constructor(
    private refreshTokenRepository: IRefreshTokenRepository,
    private tokenManager: ITokenManagerProvider
  ) { }

  /**
   * Executes the refresh token user use case.
   *
   * @async
   * @param {IRefreshTokenUserDTO} request - The refresh token validation request data.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute({ refreshTokenID }: IRefreshTokenUserDTO): Promise<ResponseDTO> {
    try {
      const refreshToken = await this.refreshTokenRepository.findByID(refreshTokenID) as RefreshTokenDTO

      if (!refreshToken) {
        return { data: { error: AuthenticateErrorTypes.InvalidToken }, success: false }
      }

      const tokenIsExpired = await this.tokenManager.validateTokenAge(refreshToken.expires_in)
      const token = await this.tokenManager.generateToken(refreshToken.user_id)
      
      if (tokenIsExpired) { 
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