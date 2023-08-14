import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-in-repository"
import { GetUserMetricsUseCase } from "../checkin/get-user-metrics"
import { ValidateCheckInUseCase } from "../checkin/validate-checkin"

export function makeValidateCheckinUseCase() {
    const checkInsRepository = new PrismaCheckInsRepository
    const useCase = new ValidateCheckInUseCase(checkInsRepository)

    return useCase
}