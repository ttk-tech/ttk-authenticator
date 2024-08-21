import { IRefreshTokenRepository } from '@application/repositories/RefreshToken';
import { IAuthenticateUserUseCase } from '@application/useCases/Authenticate/AuthenticateUser';
import { IUsersRepository } from "@application/repositories/User";
import { IPasswordHasher } from '@application/providers/PasswordHasher';
import { ITokenManagerProvider } from '@application/providers/TokenManager';

import { ResponseDTO } from '@domain/dtos/Response';
import { IAuthenticateUserDTO } from '@domain/dtos/Authenticate/AuthenticateUser';
import { AuthenticateErrorTypes } from '@domain/enums/Authenticate/ErrorType';
import { IUserInRequestDTO } from '@domain/dtos/User/UserIn';

import "@config/logging"
export class AuthenticateUserUseCase implements IAuthenticateUserUseCase {

  constructor(
    private userRepository: IUsersRepository,
    private refreshTokenRepository: IRefreshTokenRepository,
    private passwordHasher: IPasswordHasher,
    private tokenManager: ITokenManagerProvider
  ) { }

  async execute({ email, password }: IAuthenticateUserDTO): Promise<ResponseDTO> {
    try {

      const user = await this.userRepository.findByEmail(email) as IUserInRequestDTO;

      if (!user) {
        return {
          data: { error: AuthenticateErrorTypes.InvalidEmailOrPassword },
          success: false
        }
      }

      const passwordCorrect = await this.passwordHasher.comparePasswords(
        password,
        user.password
      )

      if (!passwordCorrect) {
        return {
          data: { error: AuthenticateErrorTypes.InvalidEmailOrPassword },
          success: false
        }
      }

      const token = await this.tokenManager.generateToken(user.id)


      const existToken = await this.refreshTokenRepository.findByUserID(user.id)

      if (existToken) {
        await this.refreshTokenRepository.delete(user.id)
      }

      const refreshToken = await this.refreshTokenRepository.create(user.id)

      return { data: { token, refreshToken, user }, success: true }

    }
    catch (error: any) {
      logging.error(error.message)
      return { data: { error: error.message }, success: false };
    }
  }
}
