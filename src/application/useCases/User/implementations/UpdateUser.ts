import { IUpdateUserRequestDTO } from './../../../../domain/dtos/User/UpdateUser';
import { IUserOutRequestDTO } from "@domain/dtos/User/UserOut";
import { IUpdateUserUseCase } from "../UpdateUser";
import { IUsersRepository } from "../../../repositories/User";
import { ResponseDTO } from '@domain/dtos/Response';
import { UserErrorType } from '@domain/enums/user/ErrorType';
import logging from "@config/logging";



/**
 * use case for updating user data
 * 
 * @class
 * @implements {IUpdateUserUseCase} - The user update request data
 * @return {Promise<ResponseDTO>} - The response data
 */

export class UpdateUserUseCase implements IUpdateUserUseCase {
  /**
   * Create an instance of the UpdateUserUseCase.
   * 
   * @constructor
   * @param {IUserRepository} userReposistory - The repository for user data
   */

  constructor(private userRepository: IUsersRepository) { }


  async execute(
    // userID: string,
    // hard code update by email 
    // => implement update by id when authenticated feature enabled
    userEmail: string,
    { name, email, password }: IUpdateUserRequestDTO): Promise<ResponseDTO> {
    try {
      const user = (await this.userRepository.findById(userEmail)) as IUserOutRequestDTO | null
      if (!user) {
        return {
          data: { error: UserErrorType.UserDoesNotExist },
          success: false,
        }
      }
      const updatedUser = await this.userRepository.update(user, { name, email, password })
      return { data: updatedUser, success: true };
    } catch (error: any) {
      logging.error(error)
      return { data: { error: error.message }, success: false }
    }
  }

}



