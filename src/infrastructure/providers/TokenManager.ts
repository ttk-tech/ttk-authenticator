import { ITokenManagerProvider } from '@application/providers/TokenManager';
import { sign, verify } from "jsonwebtoken"
import { server } from '@config/config'
import "@config/logging";
import dayjs from 'dayjs';


export class TokenManager implements ITokenManagerProvider {

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

  validateTokenAge(expires_in: number): boolean {
    logging.info(dayjs().isAfter(dayjs.unix(expires_in)))
    return dayjs().isAfter(dayjs.unix(expires_in))
  }

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
