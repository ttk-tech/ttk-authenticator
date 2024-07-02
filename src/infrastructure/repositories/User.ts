import { IUsersRepository } from '@application/repositories/User';
import { PrismaClient } from '@prisma/client';
import { ICreateUserRequestDTO } from '@domain/dtos/User/CreateUser';
import { IUserOutRequestDTO } from '@domain/dtos/User/UserOut';
import { IUserInRequestDTO } from '@domain/dtos/User/UserIn';
import { IUpdateUserRequestDTO } from '@domain/dtos/User/UpdateUser';
// import { PaginationDTO } from '../../domain/dtos/Pagination';
// import { IUpdateUserRequestDTO } from './../../domain/dtos/User/UpdateUser';

export class UserRepository implements IUsersRepository {
  constructor(private prisma: PrismaClient) { }

  /**
   * Creates a new user.
   *
   * @async
   * @param {ICreateUserRequestDTO} data - The user data.
   * @returns {Promise<IUserOutRequestDTO>} The created user.
   */
  async create({
    email,
    name,
    password,
  }: ICreateUserRequestDTO): Promise<IUserOutRequestDTO> {
    const user = this.prisma.user.create({
      data: {
        email,
        name,
        password
      }
    })
    return user
  }

  /**
   * Find user by email.
   *
   * @async
   * @param {userEmail} string - The user email data.
   * @returns {Promise<IUserOutRequestDTO> | unknown s} return user data.
   */
  async findByEmail(userEmail: string): Promise<IUserInRequestDTO | unknown> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: userEmail
      },
    })
    return user
  }

  /**
   * Find user by email
   * 
   * @async 
   * @param {userID} string - The user id
   * @returns {Promise<IUserOutRequestDTO> | unknown } Return user data
   */
  async findById(userID: string): Promise<IUserOutRequestDTO | unknown> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userID
      },
    })
    return user
  }

  /**
   * Find user by email
   * 
   * @async 
   * @param {userID} string - The user id
   * @returns {Promise<IUserOutRequestDTO> | unknown } Return user data
  */
  async update(
    user: IUserOutRequestDTO,
    { email, name, password }: IUpdateUserRequestDTO
  ): Promise<IUserOutRequestDTO> {
    const updateUser = await this.prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        email,
        name,
        password
      }
    })
    return updateUser
  }



}