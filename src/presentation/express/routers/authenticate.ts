import { Request, Response, Router } from 'express'
import { expressAdapter } from '@presentation/adapters/express'
import { authenticateUserComposer } from '@infrastructure/services/Authentication/authenticateUser'

const authenticateRoutes = Router()

/**
 * Endpoint to authenticate a user.
 */
authenticateRoutes.post('/', async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, authenticateUserComposer())
  return response.status(adapter.statusCode).json(adapter.body)
})

export { authenticateRoutes }