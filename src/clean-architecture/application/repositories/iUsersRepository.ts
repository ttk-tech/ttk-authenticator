export interface IUsersRepository {
  create(data: ICreateUserRequestDTO): Promise<IUserOutRequestDTO>
  findByEmail(email: string): Promise<IUserInRequestDTO | unknown>
  findById(id: string): Promise<IUserInRequestDTO | unknown>
  findAll(pageNumber: number): Promise<PaginationDTO>
  update(
    user: IUserOutRequestDTO,
    data: IUpdateUserRequestDTO,
  ): Promise<IUserOutRequestDTO>
  delete(id: string): Promise<void>
}