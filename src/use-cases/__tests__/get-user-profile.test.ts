import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetUserProfileUseCase } from '../get-user-profile'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let userRepository: InMemoryUserRepository
let sut: GetUserProfileUseCase
describe('Get user profile Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new GetUserProfileUseCase(userRepository)
  })

  it('should be able to get user profile', async () => {
    const createUser = await userRepository.create({
      address: 'Rua dos Animais, 123 - São Paulo, SP',
      cep: '01311000',
      email: 'contato@amigospets.org.br',
      name: 'ONG Amigos dos Pets',
      password_hash: await hash('123456', 6),
      phone: '(11) 98765-4321',
      createdAt: new Date(),
      city: 'São Paulo',
    })

    const { user } = await sut.execute({
      userId: createUser.id,
    })

    expect(user.name).toEqual('ONG Amigos dos Pets')
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(
      sut.execute({ userId: 'non-exist-id' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
