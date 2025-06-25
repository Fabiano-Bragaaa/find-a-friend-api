import { Pets, Prisma } from 'generated/prisma'

export interface PetsRepository {
  findById(id: string): Promise<Pets | null>
  create(data: Prisma.PetsUncheckedCreateInput): Promise<Pets>
}
