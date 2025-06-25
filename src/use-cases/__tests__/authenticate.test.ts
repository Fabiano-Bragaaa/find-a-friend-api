import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from '../authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

let userRepository: InMemoryUserRepository
let sut: AuthenticateUseCase
describe('Authenticate Use Case', async () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new AuthenticateUseCase(userRepository)
  })
  it('should be able to authenticate', async () => {
    await userRepository.create({
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
      email: 'contato@amigospets.org.br',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
  it('should not be able to authenticate with wrong email', async () => {
    await expect(
      sut.execute({
        email: 'johndoe@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
  it('should not be able to authenticate with wrong password', async () => {
    await userRepository.create({
      address: 'Rua dos Animais, 123 - São Paulo, SP',
      cep: '01311000',
      email: 'contato@amigospets.org.br',
      name: 'ONG Amigos dos Pets',
      password_hash: await hash('123456', 6),
      phone: '(11) 98765-4321',
      createdAt: new Date(),
      city: 'São Paulo',
    })

    await expect(
      sut.execute({
        email: 'contato@amigospets.org.br',
        password: '1112223',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
