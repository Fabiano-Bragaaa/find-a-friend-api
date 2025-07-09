import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { VerifyJwt } from '@/http/middlewares/verify-jwt'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/ongs', register)
  app.post('/session', authenticate)
  app.get(
    '/me',
    {
      onRequest: [VerifyJwt],
    },
    profile,
  )
}
