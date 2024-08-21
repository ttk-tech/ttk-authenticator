import { IAuthenticateUserDTO } from "@domain/dtos/Authenticate/AuthenticateUser"
import { ResponseDTO } from "@domain/dtos/Response"

/**
 * Interface for the use case of authenticate a user (login).
 *
 * @interface
 */
export interface IAuthenticateUserUseCase {
  /**
   * Executes the authenticate user use case.
   *
   * @async
   * @param {IAuthenticateUserDTO} data - The data for authenticate user use case.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(data: IAuthenticateUserDTO): Promise<ResponseDTO>
}