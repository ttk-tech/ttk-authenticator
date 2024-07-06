import { IUpdateUserRequestDTO } from '@domain/dtos/User/UpdateUser';
import { IUserOutRequestDTO } from "@domain/dtos/User/UserOut";
import { ResponseDTO } from '@domain/dtos/Response';
import { UserErrorType } from '@domain/enums/user/ErrorType';
import { UserEntity } from '@domain/entities/User';

import { IUpdateUserUseCase } from "../UpdateUser";
import { IUsersRepository } from "../../../repositories/User";
import { IPasswordHasher } from "../../../providers/PasswordHasher";

import "@config/logging";

/**
 * use case for updating user data
 * 
 * @class
 * @implements {IUpdateUserUseCase}
 */

export class UpdateUserUseCase implements IUpdateUserUseCase {

  /**
   * Create an instance of the UpdateUserUseCase.
   * 
   * @constructor
   * @param {IUserRepository} userReposistory - The repository for user data
   * 
   */

  constructor(
    private userRepository: IUsersRepository,
    private passwordHasher: IPasswordHasher
  ) { }


  async execute(
    userID: string,
    { name, email, password }: IUpdateUserRequestDTO): Promise<ResponseDTO> {
    try {
      const user = (await this.userRepository.findById(userID)) as IUserOutRequestDTO | null
      if (!user) {
        logging.error(UserErrorType.UserDoesNotExist)
        return { data: { error: UserErrorType.UserDoesNotExist }, success: false }
      }

      if (password) {
        password = await this.passwordHasher.hashPassword(password)
      }

      // check email is available
      let userAlreadyExists

      if (email) {
        userAlreadyExists = await this.userRepository.findByEmail(email)
      }

      if (userAlreadyExists) {
        logging.error(UserErrorType.UserAlreadyExists)
        return { data: { error: UserErrorType.UserAlreadyExists }, success: false }
      }

      // use user entity to format user data (email parameter)
      const userEntity = UserEntity.update({ name, email, password })

      const updatedUser = await this.userRepository.update(
        user,
        {
          name: userEntity.name,
          email: userEntity.email,
          password: userEntity.password
        }
      )
      // log error when update failed 
      if (!updatedUser) {
        logging.error(UserErrorType.UserUpdateFailure)
      }
      return { data: updatedUser, success: true };

    } catch (error: any) {
      logging.error(error)
      return { data: { error: error.message }, success: false }
    }
  }

}



