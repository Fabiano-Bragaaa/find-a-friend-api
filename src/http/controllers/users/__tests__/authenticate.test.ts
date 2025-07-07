import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('should be able to authenticate', async () => {
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

    const response = await request(app.server).post('/session').send({
      email: 'fabiano@gmail.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
