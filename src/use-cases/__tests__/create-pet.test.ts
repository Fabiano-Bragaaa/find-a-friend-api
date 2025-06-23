import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePetUseCase } from '../create-pet'

let petRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(petRepository)
  })

  it('should be able to create a pet', async () => {
    const { pet } = await sut.execute({
      about: 'Um cachorro brincalhão e carinhoso, adora atenção e passeios.',
      age: '2',
      energy_level: 'Alta',
      environment: 'Espaço grande com área externa',
      independence_level: 'Média',
      name: 'Thor',
      owner_id: 'user_12345',
      pet_images: [
        'https://example.com/images/thor1.jpg',
        'https://example.com/images/thor2.jpg',
      ],
      requirements: [
        'Precisa de passeios diários',
        'Requer acompanhamento veterinário regular',
      ],
      size: 'Médio',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
