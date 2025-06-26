import { Pets, Prisma } from 'generated/prisma'
import { FindByCharacteristicsParams, PetsRepository } from '../pets-repository'
import { randomUUID } from 'crypto'
import { InMemoryUserRepository } from './in-memory-users-repository'

type PetWithOwner = Pets & { owner: { city: string } }

export class InMemoryPetsRepository implements PetsRepository {
  public items: PetWithOwner[] = []

  constructor(private userRepository: InMemoryUserRepository) {}
  async findByCharacteristics(params: FindByCharacteristicsParams) {
    const {
      city,
      age,
      energy_level,
      independence_level,
      size,
      page = 1,
    } = params

    const lowerCaseCity = city.trim().toLowerCase()

    const pets = this.items
      .filter((item) => {
        const matchesCity = item.owner.city
          .toLowerCase()
          .includes(lowerCaseCity)

        const matchesAge = age ? item.age === age : true
        const matchesEnergy = energy_level
          ? item.energy_level === energy_level
          : true
        const matchesIndependence = independence_level
          ? item.independence_level === independence_level
          : true
        const matchesSize = size ? item.size === size : true

        return (
          matchesCity &&
          matchesAge &&
          matchesEnergy &&
          matchesIndependence &&
          matchesSize
        )
      })
      .slice((page - 1) * 20, page * 20)

    return pets
  }

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

  async create(data: Prisma.PetsUncheckedCreateInput) {
    const owner = await this.userRepository.findById(data.owner_id)

    if (!owner) {
      throw new Error('Owner not found')
    }

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
        city: owner.city,
      },
    }

    this.items.push(pets)

    return pets
  }
}
