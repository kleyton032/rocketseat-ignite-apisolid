import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-in-repository"
import { PrimasGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { CheckInUseCase } from "../checkin/checkin"

export function makeCheckinInUseCase() {
    const checkInsRepository = new PrismaCheckInsRepository
    const gymsRepository = new PrimasGymsRepository
    const useCase = new CheckInUseCase(checkInsRepository, gymsRepository)

    return useCase
}