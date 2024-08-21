import { IRefreshTokenUserDTO } from '@domain/dtos/Authenticate/RefreshTokenUser';
import { ResponseDTO } from '@domain/dtos/Response';

/**
 * Interface for the use case of refresh token.
 *
 * @interface
 */

export interface IRefreshTokenUserUseCase {
  /**
   * Executes the refresh token user use case.
   *
   * @async
   * @param {IRefreshTokenUserDTO} data - The data for refresh token user use case.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(data: IRefreshTokenUserDTO): Promise<ResponseDTO>;
}