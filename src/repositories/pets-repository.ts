import { Pets, Prisma } from 'generated/prisma'

export interface FindByCharacteristicsParams {
  city: string
  age?: string
  energy_level?: string
  independence_level?: string
  size?: string
}

export interface PetsRepository {
  findByCharacteristics(params: FindByCharacteristicsParams): Promise<Pets[]>
  findByCity(city: string): Promise<Pets[]>
  findById(id: string): Promise<Pets | null>
  create(data: Prisma.PetsUncheckedCreateInput): Promise<Pets>
}
