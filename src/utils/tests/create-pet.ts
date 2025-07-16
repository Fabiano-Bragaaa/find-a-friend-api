import { FastifyInstance } from 'fastify'
import request from 'supertest'
import { createAndAuthenticateUser } from './create-and-authenticate-user'

export async function createPet(app: FastifyInstance) {
  const { token } = await createAndAuthenticateUser(app)
  const response = await request(app.server)
    .post('/pets')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'Thor',
      about:
        'Thor é um cão dócil e brincalhão que adora crianças e outros animais.',
      requirements: [
        'Casa com quintal cercado',
        'Visitas veterinárias regulares',
        'Alimentação premium',
      ],
      pet_images: [
        'https://example.com/images/thor1.jpg',
        'https://example.com/images/thor2.jpg',
      ],
      age: 'Filhote',
      size: 'Médio',
      energy_level: 'Alto',
      independence_level: 'Médio',
      environment: 'Espaço amplo',
      owner_id: 'user_123456789',
    })

  return { response }
}
