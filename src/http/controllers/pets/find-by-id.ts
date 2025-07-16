import { MakeGetPetByIdUseCase } from '@/use-cases/factories/make-get-pet-by-id-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function findById(request: FastifyRequest, reply: FastifyReply) {
  const getPetByIdSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = getPetByIdSchema.parse(request.params)

  const getPetByIdUseCase = MakeGetPetByIdUseCase()

  const { pet } = await getPetByIdUseCase.execute({ petId: id })

  return reply.status(200).send({ pet })
}
