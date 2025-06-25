import { prisma } from '@/lib/prisma'
import { Prisma, User } from 'generated/prisma'
import { usersRepository } from '../users-repository'

export class PrismaUsersRepository implements usersRepository {
  async findById(id: string) {
    // TODO
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
