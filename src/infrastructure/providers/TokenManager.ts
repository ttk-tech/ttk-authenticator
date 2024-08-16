import { ITokenManagerProvider } from '@application/providers/TokenManager';
import { sign } from "jsonwebtoken"
import { server } from '@config/config'


export class TokenManager implements ITokenManagerProvider {

  async generateToken(token: string): Promise<string> {
    const secretKey = server.SECRET_KEY

    if (!secretKey) {
      throw new Error('API_SECRET is missing in the environment variables.')
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
    return true
  }

}
