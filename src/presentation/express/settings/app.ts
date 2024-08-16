import cors from 'cors';
import express from 'express'


// import { documentsRoutes } from '../routers/documentation'
import { userRoutes } from '@presentation/express/routers/user'
import { authenticateRoutes } from '@presentation/express/routers/authenticate'

/**
 * Express application instance.
 */
const app = express()

/**
 * CORS options for allowing all origins.
 */
const corsOptions: cors.CorsOptions = {
  origin: '*',
}

app.use(cors(corsOptions))
app.use(express.json())

/**
 * Mounting routes for documentation, user-related, and authentication endpoints.
 */
// app.use('/', documentsRoutes)
app.use('/users', userRoutes)
app.use('/authenticate', authenticateRoutes)

export { app }
