import { IAuthenticateUserDTO } from "@domain/dtos/Authenticate/AuthenticateUser"
import { ResponseDTO } from "@domain/dtos/Response"

export interface IAuthenticateUserUseCase {
  execute({ email, password }: IAuthenticateUserDTO): Promise<ResponseDTO>
}