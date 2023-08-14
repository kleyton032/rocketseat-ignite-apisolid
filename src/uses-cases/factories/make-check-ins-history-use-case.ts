import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-in-repository"
import { GetUserMetricsUseCase } from "../checkin/get-user-metrics"
import { CheckInHistoryUseCase } from "../checkin/checkin-history"

export function makeFetchUserCheckinHistoryUseCase() {
    const checkInsRepository = new PrismaCheckInsRepository
    const useCase = new CheckInHistoryUseCase(checkInsRepository)

    return useCase
}