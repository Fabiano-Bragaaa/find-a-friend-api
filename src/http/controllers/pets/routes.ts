import { FastifyInstance } from 'fastify'
import { create } from './create'
import { VerifyJwt } from '@/http/middlewares/verify-jwt'

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', VerifyJwt)
  app.post('/pets', create)
}
