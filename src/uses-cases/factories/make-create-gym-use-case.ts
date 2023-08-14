import { PrimasGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { CreateGymUseCase } from "../gym/create-gym"

export function makeCreateGymUseCase() {
    const gymsRepository = new PrimasGymsRepository
    const useCase = new CreateGymUseCase(gymsRepository)

    return useCase
}