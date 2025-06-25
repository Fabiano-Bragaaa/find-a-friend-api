import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetPetByIdUseCase } from '../get-pet-by-id'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'

let petRepository: InMemoryPetsRepository
let userRepository: InMemoryUserRepository
let sut: GetPetByIdUseCase

describe('Get pet by id Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    petRepository = new InMemoryPetsRepository(userRepository)
    sut = new GetPetByIdUseCase(petRepository)
  })

  it('should be able to get pet by id', async () => {
    const user = await userRepository.create({
      address: 'Rua das Flores, 123 - São Paulo, SP',
      cep: '01311000',
      email: 'usuari0o@example.com',
      name: 'João da Silva',
      password_hash: await hash('123456', 8),
      phone: '11987654321',
      city: 'São Paulo',
    })

    const pets = await petRepository.create({
      about: 'Um cachorro brincalhão e carinhoso, adora atenção e passeios.',
      age: '2',
      energy_level: 'Alta',
      environment: 'Espaço grande com área externa',
      independence_level: 'Média',
      name: 'Thor',
      owner_id: user.id,
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
