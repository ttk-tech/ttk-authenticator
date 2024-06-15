import { IUsersRepository } from '../repositories/iUsersRepository';
import { IPasswordHasher } from '../providers/ipasswordHasher';
import { UserErrorType } from '../../domain/enums/userErrorType';
import { ICreateUserRequestDTO } from '../../domain/dtos/User/createUserRequestDTO';
import { User } from '../../domain/entities/user';


export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private userRepository: IUsersRepository,
    private passwordHasher: IPasswordHasher,
  ) { }

  async execute({
    email,
    name,
    password,
  }: ICreateUserRequestDTO): Promise<ResponseDTO> {
    try {
      const userEntity = User.create({
        email,
        name,
        password,
      })

      const userAlreadyExists = await this.userRepository.findByEmail(
        userEntity.email.address,
      )

      if (userAlreadyExists) {
        return { data: { error: UserErrorType.UserAlreadyExists }, success: false }
      }
      const passwordHashed = await this.passwordHasher.hashPassword(password)
      const user = await this.userRepository.create({
        email: userEntity.email.address,
        name: userEntity.name,
        password: passwordHashed,
      })

      return { data: user, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}