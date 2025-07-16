import { MakeGetPetByCityUseCase } from '@/use-cases/factories/make-get-pet-by-city-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function findByCity(request: FastifyRequest, reply: FastifyReply) {
  const findByCitySchema = z.object({
    city: z.string(),
    page: z.coerce.number().optional(),
  })

  const { city, page } = findByCitySchema.parse(request.query)

  const findByCityUseCase = MakeGetPetByCityUseCase()

  const { pets } = await findByCityUseCase.execute({ city, page })

  return reply.status(200).send({
    pets,
  })
}
