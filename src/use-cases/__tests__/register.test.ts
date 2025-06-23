import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from '../register'
import { compare } from 'bcryptjs'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExists } from '../errors/user-already-exists-error'

let userRepository: InMemoryUserRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new RegisterUseCase(userRepository)
  })

  it('should has user password upon register', async () => {
    const { user } = await sut.execute({
      address: 'Rua das Flores, 123 - São Paulo, SP',
      cep: '01311000',
      email: 'usuari0o@example.com',
      name: 'João da Silva',
      password: '123456',
      phone: '11987654321',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with the same email twice', async () => {
    const email = 'johndoe@gmail.com'

    await sut.execute({
      address: 'Rua das Flores, 123 - São Paulo, SP',
      cep: '01311000',
      email,
      name: 'João da Silva',
      password: '123456',
      phone: '11987654321',
    })

    expect(() =>
      sut.execute({
        address: 'Rua das Flores, 123 - São Paulo, SP',
        cep: '01311000',
        email,
        name: 'João da Silva',
        password: '123456',
        phone: '11987654321',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExists)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      address: 'Rua das Flores, 123 - São Paulo, SP',
      cep: '01311000',
      email: 'johndoe@gmail.com',
      name: 'João da Silva',
      password: '123456',
      phone: '11987654321',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
