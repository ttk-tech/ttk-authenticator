import { Request, Response, Router } from 'express'
import { expressAdapter } from '../../adapters/express'

import { createUserComposer } from '@infrastructure/services/User/createUser';
import { getOneUserComposer } from '@infrastructure/services/User/getOneUser';
import { updateUserComposer } from '@infrastructure/services/User/updateUser';

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

/**
 * Endpoint to update user
 */
userRoutes.put('/update/:id', async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, updateUserComposer())
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
