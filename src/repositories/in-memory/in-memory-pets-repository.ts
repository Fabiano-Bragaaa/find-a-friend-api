import { Pets, Prisma } from 'generated/prisma'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pets[] = []

  async create(data: Prisma.PetsUncheckedCreateInput) {
    const pet_images = Array.isArray(data.pet_images)
      ? data.pet_images
      : (data.pet_images?.set ?? [])

    const requirements = Array.isArray(data.requirements)
      ? data.requirements
      : (data.requirements?.set ?? [])

    const pets: Pets = {
      id: data.id ?? randomUUID(),
      about: data.about,
      age: data.age,
      energy_level: data.energy_level,
      environment: data.environment,
      independence_level: data.independence_level,
      name: data.name,
      owner_id: data.owner_id,
      pet_images,
      requirements,
      size: data.size,
    }

    this.items.push(pets)

    return pets
  }
}
