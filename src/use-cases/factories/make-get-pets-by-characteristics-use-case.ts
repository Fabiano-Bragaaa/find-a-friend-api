import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetsByCharacteristicsUseCase } from '../get-pets-by-characteristics'

export function MakeGetPetsByCharacteristicsUseCase() {
  const petRepository = new PrismaPetsRepository()
  const useCase = new GetPetsByCharacteristicsUseCase(petRepository)

  return useCase
}
