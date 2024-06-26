import { PaginationDTO } from '../../domain/dtos/Pagination';
import { ICreateUserRequestDTO } from '../../domain/dtos/User/CreateUser';
import { IUpdateUserRequestDTO } from '../../domain/dtos/User/UpdateUser';
import { IUserInRequestDTO } from '../../domain/dtos/User/UserIn';
import { IUserOutRequestDTO } from '../../domain/dtos/User/UserOut';


/**
 * Interface for the repository handling user data.
 *
 * @interface
 */
export interface IUsersRepository {
  create(data: ICreateUserRequestDTO): Promise<IUserOutRequestDTO>
  findByEmail(email: string): Promise<IUserInRequestDTO | unknown>
  // findById(id: string): Promise<IUserInRequestDTO | unknown>
  // findAll(pageNumber: number): Promise<PaginationDTO>
  // update(
  //   user: IUserOutRequestDTO,
  //   data: IUpdateUserRequestDTO,
  // ): Promise<IUserOutRequestDTO>
  // delete(id: string): Promise<void>
}