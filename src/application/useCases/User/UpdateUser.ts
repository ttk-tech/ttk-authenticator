import { IUpdateUserRequestDTO } from "@domain/dtos/User/UpdateUser";
import { IUserOutRequestDTO } from "@domain/dtos/User/UserOut";
import { ResponseDTO } from "@domain/dtos/Response";

/**
 * Interface for the use case of update user's data.
 *
 * @interface
 */

export interface IUpdateUserUseCase {
  /**
   * Execute the update user use case
   * 
   * @async
   * @param {string} userID - The user id need to be updated
   * @param {IUpdateUserRequestDTO} data - Data need to be updated
   * @return {Promise<ResponseDTO>} - The response data
  */

  execute(userID: string, data: IUpdateUserRequestDTO): Promise<ResponseDTO>
}
