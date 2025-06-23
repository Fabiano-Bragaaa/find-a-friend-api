import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from '../authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

describe('Authenticate Use Case', async () => {
  it('should be able to authenticate', async () => {
    const userRepository = new InMemoryUserRepository()
    const sut = new AuthenticateUseCase(userRepository)

    await userRepository.create({
      address: 'Rua dos Animais, 123 - São Paulo, SP',
      cep: '01311000',
      email: 'contato@amigospets.org.br',
      name: 'ONG Amigos dos Pets',
      password_hash: await hash('123456', 6),
      phone: '(11) 98765-4321',
      createdAt: new Date(),
    })

    const { user } = await sut.execute({
      email: 'contato@amigospets.org.br',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
  it('should not be able to authenticate with wrong email', async () => {
    const userRepository = new InMemoryUserRepository()
    const sut = new AuthenticateUseCase(userRepository)

    await expect(
      sut.execute({
        email: 'johndoe@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
  it('should not be able to authenticate with wrong password', async () => {
    const userRepository = new InMemoryUserRepository()
    const sut = new AuthenticateUseCase(userRepository)

    await userRepository.create({
      address: 'Rua dos Animais, 123 - São Paulo, SP',
      cep: '01311000',
      email: 'contato@amigospets.org.br',
      name: 'ONG Amigos dos Pets',
      password_hash: await hash('123456', 6),
      phone: '(11) 98765-4321',
      createdAt: new Date(),
    })

    await expect(
      sut.execute({
        email: 'contato@amigospets.org.br',
        password: '1112223',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
