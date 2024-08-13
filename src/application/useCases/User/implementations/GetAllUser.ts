import { IGetAllUserUseCase } from "../GetAllUser";
import { ResponseDTO } from "@domain/dtos/Response"
import { IUsersRepository } from '@application/repositories/User';
import logging from "@config/logging";
import { UserErrorType } from "@domain/enums/user/ErrorType"

/**
 * use case for get all user data
 * 
 * @class
 * @implements {IGetAllUserUseCase}
*/

export class GetAllUserUseCase implements IGetAllUserUseCase {
  /**
   * Creates an instance of GetAllUserUseCase.
   *
   * @constructor
   * @param {IUsersRepository} userRepository - The repository for user data.
  */
  constructor(private userRepository: IUsersRepository) { }

  /**
  * Executes the create user use case.
  *
  * @async
  * @returns {Promise<ResponseDTO>} The response data.
  */
  async execute(): Promise<ResponseDTO> {
    try {
      const userList = await this.userRepository.findAll();
      if (!userList) {
        logging.error(UserErrorType.UserNotFound)
        return {
          data: { error: UserErrorType.UserNotFound },
          success: false
        }
      }
      return { data: userList, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}