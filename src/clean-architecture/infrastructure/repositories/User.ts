import { IUsersRepository } from '../../application/repositories/User';
import { PrismaClient } from '@prisma/client';
import { ICreateUserRequestDTO } from '../../domain/dtos/User/CreateUser';
import { IUserOutRequestDTO } from '../../domain/dtos/User/UserOut';
import { IUserInRequestDTO } from '../../domain/dtos/User/UserIn';
// import { PaginationDTO } from '../../domain/dtos/Pagination';
// import { IUpdateUserRequestDTO } from './../../domain/dtos/User/UpdateUser';

export class UserRepository implements IUsersRepository {
  constructor(private prisma: PrismaClient) { }

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

  async findByEmail(email: string): Promise<IUserInRequestDTO | unknown> {
    const user = this.prisma.user.findFirst({
      where: { email: email }
    })
    return user
  }

}