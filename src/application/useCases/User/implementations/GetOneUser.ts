import { IUserInRequestDTO } from './../../../../domain/dtos/User/UserIn';
import { IGetOneUserUseCase } from "../GetOneUser";
import { ResponseDTO } from "../../../../domain/dtos/Response";
import { IUsersRepository } from "../../../repositories/User";
import { UserErrorType } from "../../../../domain/enums/user/ErrorType";
import '../../../../config/logging'


/**
 * Use case for get a user by email.
 *
 * @class
 * @implements {IGetOneUserUseCase}
 */

export class GetOneUserUseCase implements IGetOneUserUseCase {
  /**
   * Create an instance of GetOneUserUseCase
   * @constructor
   * @param {IUserRepository} userRepository - The repository for user data.
   */
  constructor(private userRepository: IUsersRepository) { }

  /**
   * execute the get one use case.
   * 
   * @async
   * @param userEmail: string - get user by email
   * @returns {Promise<ResponseDTO>} - The response data
   */

  async execute(userEmail: string): Promise<ResponseDTO> {
    try {
      const user = await this.userRepository.findByEmail(userEmail) as IUserInRequestDTO | null;
      if (!user) {
        logging.error(UserErrorType.UserNotFound)
        return {
          data: { error: UserErrorType.UserNotFound },
          success: false
        }
      }
      /**
       * remove password from user for public data response
       */
      const publicUser = {
        id: user.id,
        email: user.email,
        name: user.name
      };
      return { data: publicUser, success: true };
    } catch (error: any) {
      logging.error(error)
      return { data: { error: error.message }, success: false }
    }
  }
}