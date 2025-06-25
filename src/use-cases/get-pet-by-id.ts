import { PetsRepository } from '@/repositories/pets-repository'
import { Pets } from 'generated/prisma'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetPetByIdUseCaseRequest {
  petId: string
}

interface GetPetByIdUseCaseResponse {
  pet: Pets
}

export class GetPetByIdUseCase {
  constructor(private petRepository: PetsRepository) {}

  async execute({
    petId,
  }: GetPetByIdUseCaseRequest): Promise<GetPetByIdUseCaseResponse> {
    const pet = await this.petRepository.findById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return { pet }
  }
}
