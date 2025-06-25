import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetPetByIdUseCase } from '../get-pet-by-id'

let petRepository: InMemoryPetsRepository
let sut: GetPetByIdUseCase

describe('Get pet by id Use Case', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetsRepository()
    sut = new GetPetByIdUseCase(petRepository)
  })

  it('should be able to get pet by id', async () => {
    const pets = await petRepository.create({
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

    const { pet } = await sut.execute({
      petId: pets.id,
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
