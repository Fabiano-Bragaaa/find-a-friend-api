import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBody = z.object({
    name: z.string(),
    email: z.string().email(),
    cep: z
      .string()
      .transform((value) => value.replace(/\D/g, ''))
      .refine((value) => /^\d{8}$/.test(value), {
        message: 'CEP inválido. Use 8 dígitos numéricos.',
      }),
    address: z.string(),
    phone: z
      .string()
      .transform((value) => value.replace(/\D/g, ''))
      .refine((value) => /^\d{10,11}$/.test(value), {
        message: 'Telefone inválido. Use DDD + número (10 ou 11 dígitos).',
      }),
  })

  const { name, email, address, phone, cep } = registerBody.parse(request.body)

  await prisma.user.create({
    data: {
      name,
      email,
      cep,
      address,
      phone,
    },
  })

  return reply.status(201).send()
}
