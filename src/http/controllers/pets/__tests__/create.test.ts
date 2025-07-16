import { app } from '@/app'
import { createPet } from '@/utils/tests/create-pet'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
    const { response } = await createPet(app)
    expect(response.statusCode).toEqual(201)
  })
})
