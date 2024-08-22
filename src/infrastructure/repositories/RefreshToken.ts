import { RefreshTokenDTO } from '@domain/dtos/Authenticate/RefreshToken';

import { IRefreshTokenRepository } from '@application/repositories/RefreshToken';

import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';


export class RefreshTokenRepository implements IRefreshTokenRepository {
  constructor(private prisma: PrismaClient) { }

  /**
   * Creates a new refresh token - expire in 1 hour.
   *
   * @async
   * @param {string} userID - The user id.
   * @returns {Promise<RefreshTokenDTO>} The refresh token.
   */
  async create(userID: string): Promise<RefreshTokenDTO> {
    const expiresIn = dayjs().add(1, 'h').unix();
    const generateRefreshToken = await this.prisma.refreshToken.create({
      data: {
        user_id: userID,
        expires_in: expiresIn
      }
    })
    return generateRefreshToken
  }
  /**
   * Find refresh token by id
   * 
   * @async 
   * @param {string} refreshToken - The refresh token id
   * @returns {Promise<RefreshTokenDTO> | unknown } Return refresh token data
   */
  async findByID(refreshToken: string): Promise<RefreshTokenDTO | unknown> {
    const token = await this.prisma.refreshToken.findFirst({
      where: {
        id: refreshToken,
      },
    })
    return token
  }

  /**
   * Find refresh token by user id.
   *
   * @async
   * @param {string} userID - The user id data.
   * @returns {Promise<RefreshTokenDTO> | unknown } return refresh token data.
   */
  async findByUserID(userID: string): Promise<RefreshTokenDTO | unknown> {
    const token = await this.prisma.refreshToken.findFirst({
      where: {
        user_id: userID,
      },
    })
    return token
  }

  /**
   * Delete user by user id
   * 
   * @async 
   * @param {string} userID - The user ID
   * @returns {Promise<void>}
   */
  async delete(userID: string): Promise<void> {
    await this.prisma.refreshToken.delete({
      where: {
        user_id: userID,
      },
    })
  }
}