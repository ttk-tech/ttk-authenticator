import { ITokenManagerProvider } from '@application/providers/TokenManager';
import { sign, verify } from "jsonwebtoken"
import { server } from '@config/config'
import "@config/logging";
import dayjs from 'dayjs';

/**
 * Provider for token manager.
 *
 * @class
 * @implements {ITokenManagerProvider}
 */
export class TokenManager implements ITokenManagerProvider {

  /**
   * Generate token use jsonwebtoken - sign method.
   *
   * @async
   * @param {string} token - The token to compare.
   * @returns {Promise<string>} The token has token.
   */
  async generateToken(token: string): Promise<string> {
    const secretKey = server.SECRET_KEY

    if (!secretKey) {
      throw new Error('SECRET_KEY is missing in the environment variables.')
    }

    const generatedToken = sign({}, secretKey, {
      subject: token,
      expiresIn: "30m",
    })

    return generatedToken
  }

  /**
   * Validate token expire by dayjs - compare expires_in attributes with current time.
   *
   * @async
   * @param {number} expiresIn - The expire number to compare.
   * @returns {boolean} The boolean result by compare time.
   */
  validateTokenAge(expiresIn: number): boolean {
    // logging.info(dayjs().isAfter(dayjs.unix(expiresIn)))
    // logging.log(dayjs.unix(expiresIn).toISOString())
    // logging.log(dayjs().toISOString())
    return dayjs().isAfter(dayjs.unix(expiresIn))
  }

  /**
   * Validate token by jsonwebtoken - verify method.
   *
   * @async
   * @param {string} token - The expire number to compare.
   * @returns {boolean} The boolean result by verify token.
   */
  validateToken(token: string): boolean {
    try {
      const secretKey = server.SECRET_KEY
      verify(token, secretKey)
      return true
    } catch (error: any) {
      logging.error(error.message)
      return false
    }
  }

}
