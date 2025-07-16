import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetByIdUseCase } from '../get-pet-by-id'

export function MakeGetPetByIdUseCase() {
  const petRepository = new PrismaPetsRepository()
  const useCase = new GetPetByIdUseCase(petRepository)

  return useCase
}
