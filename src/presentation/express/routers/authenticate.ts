import { Request, Response, Router } from 'express'
import { expressAdapter } from '@presentation/adapters/express'
import { authenticateUserComposer } from '@infrastructure/services/Authentication/authenticateUser'
import { refreshTokenUserComposer } from '@infrastructure/services/Authentication/refreshTokenUser'

const authenticateRoutes = Router()

/**
 * Endpoint to authenticate a user.
 */
authenticateRoutes.post('/', async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, authenticateUserComposer())
  return response.status(adapter.statusCode).json(adapter.body)
})

/**
 * Endpoint to refresh token user.
 */
authenticateRoutes.post('/refreshToken', async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, refreshTokenUserComposer())
  return response.status(adapter.statusCode).json(adapter.body)
})


export { authenticateRoutes }