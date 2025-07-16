import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Thor',
        about:
          'Thor é um cão dócil e brincalhão que adora crianças e outros animais.',
        requirements: [
          'Casa com quintal cercado',
          'Visitas veterinárias regulares',
          'Alimentação premium',
        ],
        pet_images: [
          'https://example.com/images/thor1.jpg',
          'https://example.com/images/thor2.jpg',
        ],
        age: 'Filhote',
        size: 'Médio',
        energy_level: 'Alto',
        independence_level: 'Médio',
        environment: 'Espaço amplo',
        owner_id: 'user_123456789',
      })

    expect(response.statusCode).toEqual(201)
  })
})
