import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post('/ongs').send({
    name: 'João Silva',
    email: 'fabiano@gmail.com',
    password: '123456',
    confirm_password: '123456',
    cep: '12345678',
    address: 'Rua das Flores, 123',
    city: 'São Paulo',
    phone: '11987654321',
  })

  const authResponse = await request(app.server).post('/session').send({
    email: 'fabiano@gmail.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return { token }
}
