import { PrimasGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { SearchGymsUseCase } from "../gym/search-gyms"
import { FetchNearbyGymsUseCase } from "../gym/fetch-nearby-gyms"

export function makeFetchNearbyGymsUseCase() {
    const gymsRepository = new PrimasGymsRepository
    const useCase = new FetchNearbyGymsUseCase(gymsRepository)

    return useCase
}