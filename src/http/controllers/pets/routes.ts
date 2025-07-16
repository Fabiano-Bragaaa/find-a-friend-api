import { FastifyInstance } from 'fastify'
import { create } from './create'
import { VerifyJwt } from '@/http/middlewares/verify-jwt'
import { findById } from './findById'

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', VerifyJwt)
  app.post('/pets', create)
  app.get('/pets/:id', findById)
}
