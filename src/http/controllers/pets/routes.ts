import { FastifyInstance } from 'fastify'
import { create } from './create'
import { VerifyJwt } from '@/http/middlewares/verify-jwt'
import { findById } from './find-by-id'
import { findByCharacteristics } from './find-by-characteristics'
import { findByCity } from './find-by-city'

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', VerifyJwt)
  app.post('/pets', create)
  app.get('/pets/:id', findById)
  app.get('/pets', findByCharacteristics)
  app.get('/pets/city/', findByCity)
}
