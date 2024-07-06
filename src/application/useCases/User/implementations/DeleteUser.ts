import { ResponseDTO } from './../../../../domain/dtos/Response';
import { UserErrorType } from '@domain/enums/user/ErrorType';
import { UserSuccessType } from '@domain/enums/user/SuccessType';

import { IDeleteUserUseCase } from "./../DeleteUser";
import { IUsersRepository } from "../../../repositories/User";

import "@config/logging";



/**
 * use case for delete user data
 * 
 * @class
 * @implements {IDeleteUserUseCase}
 */

export class DeleteUserUseCase implements IDeleteUserUseCase {

  constructor(
    private userRepository: IUsersRepository
  ) { }

  async execute(userID: string): Promise<ResponseDTO> {
    try {
      const userAlreadyExists = await this.userRepository.findById(userID);

      if (!userAlreadyExists) {
        logging.error(UserErrorType.UserDoesNotExist)
        return { data: UserErrorType.UserDoesNotExist, success: false }
      }

      await this.userRepository.delete(userID);
      return { data: UserSuccessType.UserDeleted, success: true }

    } catch (error: any) {
      logging.error(error)
      return { data: { error: error.message }, success: false }
    }
  }
}