import { RefreshTokenDTO } from "@domain/dtos/Authenticate/RefreshToken"

export interface IRefreshTokenRepository {
  create(userID: string): Promise<RefreshTokenDTO>
  findByID(refreshToken: string): Promise<RefreshTokenDTO>
  findByUserID(userID: string): Promise<RefreshTokenDTO>
  delete(userID: string): Promise<void>
}