import { prisma } from '@/lib/prisma'
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private userRepository: any) {}

  async execute({
    address,
    cep,
    email,
    name,
    password,
    phone,
  }: RegisterUseCaseTypes) {
    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })

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
