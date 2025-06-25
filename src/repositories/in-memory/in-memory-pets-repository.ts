import { Pets, Prisma } from 'generated/prisma'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'crypto'

type PetWithOwner = Pets & { owner: { city: string } }

type PetWithOwnerCreateInput = Prisma.PetsUncheckedCreateInput & {
  owner: { city: string }
}

export class InMemoryPetsRepository implements PetsRepository {
  public items: PetWithOwner[] = []

  async findByCity(city: string) {
    const lowerCaseCity = city.toLowerCase().trim()
    const pets = this.items.filter((item) =>
      item.owner.city.toLocaleLowerCase().includes(lowerCaseCity),
    )

    return pets
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async create(data: PetWithOwnerCreateInput) {
    const pet_images = Array.isArray(data.pet_images)
      ? data.pet_images
      : (data.pet_images?.set ?? [])

    const requirements = Array.isArray(data.requirements)
      ? data.requirements
      : (data.requirements?.set ?? [])

    const pets: PetWithOwner = {
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
      owner: {
        city: data.owner.city,
      },
    }

    this.items.push(pets)

    return pets
  }
}
