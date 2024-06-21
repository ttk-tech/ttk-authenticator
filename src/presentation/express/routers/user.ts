import { Request, Response, Router } from 'express'

import { createUserComposer } from '../../../infrastructure/services/User/createUser';
import { expressAdapter } from '../../adapters/express'
import { getOneUserComposer } from '../../../infrastructure/services/User/getOneUser';

/**
 * Router for handling user-related routes.
 */
const userRoutes = Router()

/**
 * Endpoint to create a new user.
 */
userRoutes.post('/', async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, createUserComposer())
  return response.status(adapter.statusCode).json(adapter.body)
})

/**
 * Endpoint to get single user.
 */
userRoutes.get('/getOne', async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, getOneUserComposer())
  return response.status(adapter.statusCode).json(adapter.body)
})

// userRoutes.get(
//   '/',
//   async (request: Request, response: Response) => {
//     const adapter = await expressAdapter(request, getUserComposer())
//     return response.status(adapter.statusCode).json(adapter.body)
//   },
// )

export { userRoutes }
