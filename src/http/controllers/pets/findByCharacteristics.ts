import { MakeGetPetsByCharacteristicsUseCase } from '@/use-cases/factories/make-get-pets-by-characteristics-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function findByCharacteristics(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const findPetsByCharacteristicsSchema = z.object({
    city: z.string(),
    age: z.string().optional(),
    energy_level: z.string().optional(),
    independence_level: z.string().optional(),
    size: z.string().optional(),
    page: z.coerce.number().optional(),
  })

  const { city, age, energy_level, independence_level, page, size } =
    findPetsByCharacteristicsSchema.parse(request.query)

  const findPetsByCharacteristicsUseCase = MakeGetPetsByCharacteristicsUseCase()

  const { pets } = await findPetsByCharacteristicsUseCase.execute({
    city,
    age,
    energy_level,
    independence_level,
    page,
    size,
  })

  return reply.status(200).send({
    pets,
  })
}
