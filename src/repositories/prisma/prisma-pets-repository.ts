import { Prisma } from 'generated/prisma'
import { FindByCharacteristicsParams, PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async findByCharacteristics(params: FindByCharacteristicsParams) {
    const page = params.page ?? 1
    const pets = await prisma.pets.findMany({
      where: {
        owner: {
          city: params.city,
        },
        ...(params.age && { age: params.age }),
        ...(params.energy_level && { energy_level: params.energy_level }),
        ...(params.independence_level && {
          independence_level: params.independence_level,
        }),
        ...(params.size && { size: params.size }),
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return pets
  }

  async findByCity(city: string, page = 1) {
    const pets = await prisma.pets.findMany({
      where: {
        owner: {
          city,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return pets
  }

  async findById(id: string) {
    const pet = await prisma.pets.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async create(data: Prisma.PetsUncheckedCreateInput) {
    const pet = await prisma.pets.create({
      data,
    })

    return pet
  }
}
