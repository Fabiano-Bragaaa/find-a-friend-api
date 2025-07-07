import { FastifyInstance } from 'fastify'
import { create } from './create'
import { VerifyJwt } from '@/http/middlewares/verify-jwt'

export async function petsRoutes(app: FastifyInstance) {
  app.post(
    '/pets',
    {
      onRequest: [VerifyJwt],
    },
    create,
  )
}
