import { RefreshTokenDTO } from "@domain/dtos/Authenticate/RefreshToken"

export interface IRefreshTokenRepository {
  create(userID: string): Promise<RefreshTokenDTO>
  findByID(refreshToken: string): Promise<RefreshTokenDTO | unknown>
  findByUserID(userID: string): Promise<RefreshTokenDTO | unknown>
  delete(userID: string): Promise<void>
}