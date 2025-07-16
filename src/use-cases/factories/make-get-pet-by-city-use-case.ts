import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetsByCityUseCase } from '../get-pets-by-city'

export function MakeGetPetByCityUseCase() {
  const petRepository = new PrismaPetsRepository()
  const useCase = new GetPetsByCityUseCase(petRepository)

  return useCase
}
