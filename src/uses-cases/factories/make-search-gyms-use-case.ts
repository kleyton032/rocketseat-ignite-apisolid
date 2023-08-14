import { PrimasGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { SearchGymsUseCase } from "../gym/search-gyms"

export function makeSearchGymsUseCase() {
    const gymsRepository = new PrimasGymsRepository
    const useCase = new SearchGymsUseCase(gymsRepository)

    return useCase
}