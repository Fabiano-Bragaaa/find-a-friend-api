import { PetsRepository } from '@/repositories/pets-repository'
import { Pets } from 'generated/prisma'
import { NoPetsFoundError } from './errors/no-pets-found-error'

interface GetPetsByCityUseCaseRequest {
  city: string
}
interface GetPetsByCityUseCaseResponse {
  pets: Pets[]
}

export class GetPetsByCityUseCase {
  constructor(private petRepository: PetsRepository) {}

  async execute({
    city,
  }: GetPetsByCityUseCaseRequest): Promise<GetPetsByCityUseCaseResponse> {
    const pets = await this.petRepository.findByCity(city)

    if (pets.length === 0) {
      throw new NoPetsFoundError()
    }

    return { pets }
  }
}
