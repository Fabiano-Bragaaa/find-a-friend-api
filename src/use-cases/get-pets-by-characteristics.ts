import { PetsRepository } from '@/repositories/pets-repository'
import { Pets } from 'generated/prisma'
import { NoPetsFoundError } from './errors/no-pets-found-error'

interface GetPetsByCharacteristicsUseCaseRequest {
  city: string
  age?: string
  energy_level?: string
  independence_level?: string
  size?: string
  page?: number
}

interface GetPetsByCharacteristicsUseCaseResponse {
  pets: Pets[]
}

export class GetPetsByCharacteristicsUseCase {
  constructor(private petRepository: PetsRepository) {}

  async execute({
    city,
    age,
    energy_level,
    independence_level,
    size,
    page,
  }: GetPetsByCharacteristicsUseCaseRequest): Promise<GetPetsByCharacteristicsUseCaseResponse> {
    const pets = await this.petRepository.findByCharacteristics({
      city,
      age,
      energy_level,
      independence_level,
      size,
      page,
    })

    if (pets.length === 0) {
      throw new NoPetsFoundError()
    }

    return { pets }
  }
}
