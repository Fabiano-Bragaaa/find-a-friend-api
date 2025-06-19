import { prisma } from '@/lib/prisma'
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'
import { hash } from 'bcryptjs'

interface registerUseCaseTypes {
  name: string
  email: string
  password: string
  cep: string
  address: string
  phone: string
}

export async function registerUseCase({
  name,
  email,
  password,
  cep,
  address,
  phone,
}: registerUseCaseTypes) {
  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('E-mail already exists.')
  }

  const password_hash = await hash(password, 6)

  const prismaUsersRepository = new PrismaUsersRepository()

  await prismaUsersRepository.create({
    name,
    address,
    cep,
    email,
    password_hash,
    phone,
  })
}
