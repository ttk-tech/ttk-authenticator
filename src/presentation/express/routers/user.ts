import { Request, Response, Router } from 'express'
import { expressAdapter } from '../../adapters/express'

import { createUserComposer } from '@infrastructure/services/User/createUser';
import { getOneUserComposer } from '@infrastructure/services/User/getOneUser';
import { updateUserComposer } from '@infrastructure/services/User/updateUser';
import { userDeleteComposer } from '@infrastructure/services/User/deleteUser';
import { getAllUserComposer } from '@infrastructure/services/User/getAllUser';

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
userRoutes.put('/:id', async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, updateUserComposer())
  return response.status(adapter.statusCode).json(adapter.body)
})


/**
 * Endpoint to delete user
 */
userRoutes.delete('/:id', async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, userDeleteComposer())
  return response.status(adapter.statusCode).json(adapter.body)
})

/**
 * Endpoint to get all user.
 */
userRoutes.get('/getAll', async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, getAllUserComposer())
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
