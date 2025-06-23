import { Pets, Prisma } from 'generated/prisma'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pets[] = []

  async create(data: Prisma.PetsUncheckedCreateInput) {
    const petImages = Array.isArray(data.petImages)
      ? data.petImages
      : (data.petImages?.set ?? [])

    const requirements = Array.isArray(data.requirements)
      ? data.requirements
      : (data.requirements?.set ?? [])

    const pets: Pets = {
      id: data.id ?? randomUUID(),
      about: data.about,
      age: data.age,
      energyLevel: data.energyLevel,
      environment: data.environment,
      independenceLevel: data.independenceLevel,
      name: data.name,
      owner_id: data.owner_id,
      petImages,
      requirements,
      size: data.size,
    }

    this.items.push(pets)

    return pets
  }
}
