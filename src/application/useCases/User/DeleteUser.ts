import { ResponseDTO } from "@domain/dtos/Response"

/**
 * Interface for the use case of delete a user.
 *
 * @interface
 */

export interface IDeleteUserUseCase {
  /**
   * Execute the delete use case
   * 
   * @async 
   * @param {string} userID - ID of the user
   * @returns {Promise<ResponseDTO>} - response dto
  */

  execute(userID: string): Promise<ResponseDTO>
}
