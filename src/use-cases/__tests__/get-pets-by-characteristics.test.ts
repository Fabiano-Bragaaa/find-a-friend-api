import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetPetsByCharacteristicsUseCase } from '../get-pets-by-characteristics'
import { hash } from 'bcryptjs'
import { NoPetsFoundError } from '../errors/no-pets-found-error'

let petRepository: InMemoryPetsRepository
let userRepository: InMemoryUserRepository
let sut: GetPetsByCharacteristicsUseCase
describe('Get pets by Characteristics Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    petRepository = new InMemoryPetsRepository(userRepository)
    sut = new GetPetsByCharacteristicsUseCase(petRepository)
  })

  it('should be able to get with pets params', async () => {
    const user = await userRepository.create({
      address: 'Rua das Flores, 123 - São Paulo, SP',
      cep: '01311000',
      email: 'usuari0o@example.com',
      name: 'João da Silva',
      password_hash: await hash('123456', 8),
      phone: '11987654321',
      city: 'São Paulo',
    })

    await petRepository.create({
      about: 'Um cachorro brincalhão e carinhoso, adora atenção e passeios.',
      age: '3',
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

    await petRepository.create({
      about: 'Um cachorro brincalhão.',
      age: '2',
      energy_level: 'Alta',
      environment: 'Espaço grande com área externa',
      independence_level: 'Média',
      name: 'Thomas',
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

    const { pets } = await sut.execute({
      city: 'São',
      age: '2',
      energy_level: 'Alta',
      independence_level: 'Média',
      size: 'Médio',
    })

    expect(pets).toEqual([expect.objectContaining({ name: 'Thomas' })])
  })
  it('should not be able to get with pets params', async () => {
    await expect(
      sut.execute({
        city: 'São',
        age: '2',
        energy_level: 'Alta',
        independence_level: 'Média',
        size: 'Médio',
      }),
    ).rejects.toBeInstanceOf(NoPetsFoundError)
  })
  it('should be able to get pets with pagination', async () => {
    const user = await userRepository.create({
      address: 'Rua das Flores, 123 - São Paulo, SP',
      cep: '01311000',
      email: 'usuari0o@example.com',
      name: 'João da Silva',
      password_hash: await hash('123456', 8),
      phone: '11987654321',
      city: 'São Paulo',
    })

    for (let i = 1; i <= 22; i++) {
      await petRepository.create({
        about: 'Um cachorro brincalhão e carinhoso, adora atenção e passeios.',
        age: '3',
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
    }

    const { pets } = await sut.execute({
      city: 'São Paulo',
      size: 'Médio',
      page: 2,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'Thor' }),
      expect.objectContaining({ independence_level: 'Média' }),
    ])
  })
})
