import { ResponseDTO } from '@domain/dtos/Response';

/**
 * Interface for the use case of get all user.
 *
 * @interface
 */

export interface IGetAllUserUseCase {
  /**
   * Execute the get all user use case
   * 
   * @async
   * @return {Promise<ResponseDTO>} - response data
   */
  execute(): Promise<ResponseDTO>
}