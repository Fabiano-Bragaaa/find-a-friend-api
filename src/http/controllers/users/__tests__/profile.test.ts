import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user profile', async () => {
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

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: 'fabiano@gmail.com',
      }),
    )
  })
})
