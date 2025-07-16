import { MakeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    requirements: z.array(z.string()),
    pet_images: z.array(z.string().url()),
    age: z.string(),
    size: z.string(),
    energy_level: z.string(),
    independence_level: z.string(),
    environment: z.string(),
  })

  const {
    about,
    age,
    energy_level,
    environment,
    independence_level,
    name,
    pet_images,
    requirements,
    size,
  } = createPetBodySchema.parse(request.body)

  const createPetUseCase = MakeCreatePetUseCase()

  const { pet } = await createPetUseCase.execute({
    about,
    age,
    energy_level,
    environment,
    independence_level,
    name,
    pet_images,
    requirements,
    size,
    owner_id: request.user.sub,
  })

  return reply.status(201).send({ pet })
}
