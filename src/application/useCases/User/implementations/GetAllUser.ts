import { IGetAllUserUseCase } from "../GetAllUser";
import { ResponseDTO } from "@domain/dtos/Response"
import { IUsersRepository } from '@application/repositories/User';
import logging from "@config/logging";
import { UserErrorType } from "@domain/enums/user/ErrorType"

export class GetAllUserUseCase implements IGetAllUserUseCase {

  constructor(private userRepository: IUsersRepository) { }

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