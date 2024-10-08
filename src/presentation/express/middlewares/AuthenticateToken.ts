import { RequestHandler, NextFunction, Request, Response } from "express"
import { TokenManager } from "@infrastructure/providers/TokenManager"
import { AuthenticateErrorTypes } from "@domain/enums/authenticate/ErrorType"
import "@config/logging"

/**
 * Authenticate middleware use for routes.
 * Validate token by header authorization
 * @returns {next()}
 */

export const AuthenticateToken: RequestHandler = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const token = request.headers.authorization
    const tokenManager = new TokenManager()

    if (!token) {
        logging.error(AuthenticateErrorTypes.TokenIsMissing)
        return response.status(401).json({ message: AuthenticateErrorTypes.TokenIsMissing })
    }

    const validToken = tokenManager.validateToken(token)
    if (!validToken) {
        return response.status(400).json({ message: AuthenticateErrorTypes.InvalidToken })
    }
    return next()
}