import { usersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExists } from './errors/user-already-exists-error'

interface RegisterUseCaseTypes {
  name: string
  email: string
  password: string
  cep: string
  address: string
  phone: string
  city: string
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
    city,
  }: RegisterUseCaseTypes) {
    const userWithSameEmail = await this.userRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExists()
    }

    const password_hash = await hash(password, 6)

    const user = await this.userRepository.create({
      name,
      address,
      cep,
      email,
      password_hash,
      phone,
      city,
    })

    return { user }
  }
}
