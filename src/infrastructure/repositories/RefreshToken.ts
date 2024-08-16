import { RefreshTokenDTO } from '@domain/dtos/Authenticate/RefreshToken';

import { IRefreshTokenRepository } from '@application/repositories/RefreshToken';

import { PrismaClient } from '@prisma/client';


export class RefreshTokenRepository implements IRefreshTokenRepository {
  constructor(private prisma: PrismaClient) { }

  async create(userID: string): Promise<RefreshTokenDTO> {
    const expiresIn = new Date().getTime() + 1 * 60 * 60 * 1000 // 1 hour
    const generateRefreshToken = await this.prisma.refreshToken.create({
      data: {
        user_id: userID,
        expires_in: expiresIn
      }
    })
    return generateRefreshToken
  }

  async findByID(refreshToken: string): Promise<RefreshTokenDTO | unknown> {
    const token = await this.prisma.refreshToken.findFirst({
      where: {
        id: refreshToken,
      },
    })
    return token
  }
  async findByUserID(userID: string): Promise<RefreshTokenDTO | unknown> {
    const token = await this.prisma.refreshToken.findFirst({
      where: {
        user_id: userID,
      },
    })
    return token
  }

  async delete(userID: string): Promise<void> {
    await this.prisma.refreshToken.delete({
      where: {
        user_id: userID,
      },
    })
  }
}