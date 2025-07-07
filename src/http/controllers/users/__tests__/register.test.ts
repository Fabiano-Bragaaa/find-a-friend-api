import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('should be able to register', async () => {
    const response = await request(app.server).post('/ongs').send({
      name: 'João Silva',
      email: 'fabiano@gmail.com',
      password: '123456',
      confirm_password: '123456',
      cep: '12345678',
      address: 'Rua das Flores, 123',
      city: 'São Paulo',
      phone: '11987654321',
    })

    expect(response.statusCode).toEqual(201)
  })
})
