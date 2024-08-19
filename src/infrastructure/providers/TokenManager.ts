import { ITokenManagerProvider } from '@application/providers/TokenManager';
import { sign, verify } from "jsonwebtoken"
import { server } from '@config/config'
import "@config/logging";



export class TokenManager implements ITokenManagerProvider {

  async generateToken(token: string): Promise<string> {
    const secretKey = server.SECRET_KEY

    if (!secretKey) {
      throw new Error('SECRET_KEY is missing in the environment variables.')
    }

    const generatedToken = sign({}, secretKey, {
      subject: token,
      expiresIn: "1h",
    })
    return generatedToken
  }

  validateTokenAge(expires_in: number): boolean {
    return true
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
