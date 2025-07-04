import { UserAlreadyExists } from '@/use-cases/errors/user-already-exists-error'
import { MakeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  try {
    const registerBody = z
      .object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        confirm_password: z.string().min(6),
        cep: z
          .string()
          .transform((value) => value.replace(/\D/g, ''))
          .refine((value) => /^\d{8}$/.test(value), {
            message: 'CEP inválido. Use 8 dígitos numéricos.',
          }),
        address: z.string(),
        city: z.string(),
        phone: z
          .string()
          .transform((value) => value.replace(/\D/g, ''))
          .refine((value) => /^\d{10,11}$/.test(value), {
            message: 'Telefone inválido. Use DDD + número (10 ou 11 dígitos).',
          }),
      })
      .refine((data) => data.password === data.confirm_password, {
        message: 'As senhas não coincidem.',
        path: ['confirm_password'],
      })

    const { name, email, address, phone, cep, city, password } =
      registerBody.parse(request.body)

    const { registerUseCase } = MakeRegisterUseCase()

    await registerUseCase.execute({
      name,
      email,
      password,
      address,
      cep,
      phone,
      city,
    })

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof UserAlreadyExists) {
      return reply.status(409).send({ message: error.message })
    }
    throw error
  }
}
