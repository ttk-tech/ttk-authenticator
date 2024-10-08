import { ResponseDTO } from '@domain/dtos/Response';
import { ICreateUserRequestDTO } from '@domain/dtos/User/CreateUser';
import { UserEntity } from '@domain/entities/User';
import { UserErrorType } from '@domain/enums/user/ErrorType';

import { IPasswordHasher } from '@application/providers/PasswordHasher'
import { IUsersRepository } from '@application/repositories/User'
import { ICreateUserUseCase } from '../CreateUser'
import "@config/logging"

/**
 * Use case for creating a new user.
 *
 * @class
 * @implements {ICreateUserUseCase}
 */
export class CreateUserUseCase implements ICreateUserUseCase {
  
  /**
   * Creates an instance of CreateUserUseCase.
   *
   * @constructor
   * @param {IUsersRepository} userRepository - The repository for user data.
   * @param {IPasswordHasher} passwordHasher - The password hasher provider.
   */
  constructor(
    private userRepository: IUsersRepository,
    private passwordHasher: IPasswordHasher,
  ) { }

  /**
   * Executes the create user use case.
   *
   * @async
   * @param {ICreateUserRequestDTO} request - The user creation request data.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute({
    email,
    name,
    password,
  }: ICreateUserRequestDTO): Promise<ResponseDTO> {
    try {
      const userEntity = UserEntity.create({
        email,
        name,
        password,
      })

      const userAlreadyExists = await this.userRepository.findByEmail(
        userEntity.email.address,
      )

      if (userAlreadyExists) {
        logging.error(UserErrorType.UserAlreadyExists)
        return {
          data: { error: UserErrorType.UserAlreadyExists },
          success: false,
        }
      }

      const passwordHashed = await this.passwordHasher.hashPassword(password)
      const user = await this.userRepository.create({
        email: userEntity.email.address,
        name: userEntity.name,
        password: passwordHashed,
      })

      return { data: user, success: true }
    } catch (error: any) {
      logging.error(error.message)
      return { data: { error: error.message }, success: false }
    }
  }
}
