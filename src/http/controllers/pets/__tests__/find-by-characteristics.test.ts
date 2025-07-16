import { app } from '@/app'
import request from 'supertest'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import { createPet } from '@/utils/tests/create-pet'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('find pet by characteristics (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to get pet by characteristics', async () => {
    const { token } = await createAndAuthenticateUser(app)
    await createPet(app)

    const getResponse = await request(app.server)
      .get('/pets')
      .query({ city: 'São Paulo', size: 'Médio' })
      .set('Authorization', `Bearer ${token}`)

    expect(getResponse.statusCode).toEqual(200)

    expect(getResponse.body.pets).toEqual([
      expect.objectContaining({
        name: 'Thor',
        age: 'Filhote',
        size: 'Médio',
      }),
    ])
  })
})
