import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-in-repository"
import { GetUserMetricsUseCase } from "../checkin/get-user-metrics"

export function makeGetUserMetricsUseCase() {
    const checkInsRepository = new PrismaCheckInsRepository
    const useCase = new GetUserMetricsUseCase(checkInsRepository)

    return useCase
}