import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";


interface CheckInHistoryUseCaseRequest {
    userId: string,
    page: number,

}

interface CheckInHistoryCaseResponde {
    checkIns: CheckIn[]
}

export class CheckInHistoryUseCase {
    constructor(
        private checkInsRepository: CheckInsRepository) { }

    async execute({ userId, page }: CheckInHistoryUseCaseRequest): Promise<CheckInHistoryCaseResponde> {

        const checkIns = await this.checkInsRepository.findManyUserId(userId, page)

        return {
            checkIns
        }
    }
}