import { Pets, Prisma } from 'generated/prisma'

export interface PetsRepository {
  findByCity(city: string): Promise<Pets[]>
  findById(id: string): Promise<Pets | null>
  create(data: Prisma.PetsUncheckedCreateInput): Promise<Pets>
}
