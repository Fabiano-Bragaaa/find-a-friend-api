import { Pets, Prisma } from 'generated/prisma'

export interface PetsRepository {
  create(data: Prisma.PetsUncheckedCreateInput): Promise<Pets>
}
