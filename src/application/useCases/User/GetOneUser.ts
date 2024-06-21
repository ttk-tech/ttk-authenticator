import { ResponseDTO } from "../../../domain/dtos/Response"

export interface IGetOneUserUseCase {
  /**
   * @async
   * @param {string} userEmail - The email of the user
   * @return {Promise<ResponseDTO>} The response data.
   */
  execute(userEmail: string): Promise<ResponseDTO>
}