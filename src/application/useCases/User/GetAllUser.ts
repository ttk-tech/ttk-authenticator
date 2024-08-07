import { ResponseDTO } from '@domain/dtos/Response';

export interface IGetAllUserUseCase {
  /**
   * 
   * @async
   * @return {Promise<ResponseDTO>}
   */
  execute(): Promise<ResponseDTO>
}