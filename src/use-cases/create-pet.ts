import { PetsRepository } from '@/repositories/pets-repository'

import { Pets } from 'generated/prisma'

interface CreatePetUseCaseRequest {
  name: string
  about: string
  requirements: string[]
  pet_images: string[]
  age: string
  size: string
  energy_level: string
  independence_level: string
  environment: string
  owner_id: string
}

interface CreatePetUseCaseResponse {
  pet: Pets
}

export class CreatePetUseCase {
  constructor(private pet: PetsRepository) {}

  async execute({
    about,
    age,
    energy_level,
    environment,
    independence_level,
    name,
    owner_id,
    pet_images,
    requirements,
    size,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = await this.pet.create({
      about,
      age,
      energy_level,
      environment,
      independence_level,
      size,
      name,
      owner_id,
      pet_images,
      requirements,
    })

    return { pet }
  }
}
