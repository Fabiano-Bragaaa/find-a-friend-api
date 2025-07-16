import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { VerifyJwt } from '@/http/middlewares/verify-jwt'
import { refresh } from './refresh'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/ongs', register)
  app.post('/session', authenticate)
  app.patch('/token/refresh', refresh)
  app.get(
    '/me',
    {
      onRequest: [VerifyJwt],
    },
    profile,
  )
}
