import { User, Prisma } from 'generated/prisma'
import { usersRepository } from '../users-repository'

export class InMemoryUserRepository implements usersRepository {
  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  public items: User[] = []
  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user: User = {
      id: 'user-1',
      address: data.address,
      cep: data.address,
      createdAt: new Date(),
      email: data.email,
      name: data.name,
      password_hash: data.password_hash,
      phone: data.phone,
    }

    this.items.push(user)

    return user
  }
}
