import { RefreshTokenDTO } from "@domain/dtos/Authenticate/RefreshToken"

/**
 * Interface for the repository handling refresh token data 
 * 
 * @interface
 */

export interface IRefreshTokenRepository {
  /**
   * Create a new refresh token
   * 
   * @param {string} email - The email of the user
   * @return {Promise<RefreshTokenDTO>} - The created refresh token
   */
  create(userID: string): Promise<RefreshTokenDTO>

  /**
   * Find a refresh token by ID
   * 
   * @param {string} refreshToken - The id of the refresh token
   * @return {Promise<RefreshTokenDTO | unknown>} - The refresh token
   */
  findByID(refreshToken: string): Promise<RefreshTokenDTO | unknown>

  /**
   * Find a refresh token by user ID
   * 
   * @param {string} userID - The user id
   * @return {Promise<RefreshTokenDTO | unknown>} - The refresh token
   */
  findByUserID(userID: string): Promise<RefreshTokenDTO | unknown>

  /**
   * Delete refresh token by user id
   * 
   * @param {string} userID - The user id
   * @return {Promise<void>} - Delete message from server
   */
  delete(userID: string): Promise<void>
}