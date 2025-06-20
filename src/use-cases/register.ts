import { usersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'

interface RegisterUseCaseTypes {
  name: string
  email: string
  password: string
  cep: string
  address: string
  phone: string
}

export class RegisterUseCase {
  constructor(private userRepository: usersRepository) {}

  async execute({
    address,
    cep,
    email,
    name,
    password,
    phone,
  }: RegisterUseCaseTypes) {
    const userWithSameEmail = await this.userRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new Error('E-mail already exists.')
    }

    const password_hash = await hash(password, 6)

    await this.userRepository.create({
      name,
      address,
      cep,
      email,
      password_hash,
      phone,
    })
  }
}
