import { RefreshTokenDTO } from '@domain/dtos/Authenticate/RefreshToken';

import { IRefreshTokenRepository } from '@application/repositories/RefreshToken';

import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';


export class RefreshTokenRepository implements IRefreshTokenRepository {
  constructor(private prisma: PrismaClient) { }

  async create(userID: string): Promise<RefreshTokenDTO> {
    const expiresIn = dayjs().add(1, 'hour').unix();
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