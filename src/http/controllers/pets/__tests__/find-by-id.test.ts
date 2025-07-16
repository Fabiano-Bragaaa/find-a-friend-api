import { app } from '@/app'
import request from 'supertest'
import { createPet } from '@/utils/tests/create-pet'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'

describe('find pet by id (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a pet by id', async () => {
    const { token } = await createAndAuthenticateUser(app)
    const { response } = await createPet(app)

    const createPetId = response.body.id

    expect(createPetId).toBeTruthy()

    const getResponse = await request(app.server)
      .get(`/pets/${createPetId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(getResponse.statusCode).toEqual(200)

    expect(getResponse.body.pet).toEqual(
      expect.objectContaining({
        id: createPetId,
        name: 'Thor',
        age: 'Filhote',
        size: 'Médio',
      }),
    )
  })
})
