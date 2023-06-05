import { CheckIn } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface ValidateCheckInUseCaseRequest {
    checkInId: string,
}

interface ValidateCheckInUseCaseResponde {
    checkIn: CheckIn
}

export class ValidateCheckInUseCase {
    constructor(private checkInsRepository: CheckInsRepository) { }

    async execute({ checkInId }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponde> {

        const checkIn = await this.checkInsRepository.findById(checkInId)

        if (!checkIn) {
            throw new ResourceNotFoundError()
        }

        checkIn.validated_at = new Date()

        await this.checkInsRepository.save(checkIn)

        return {
            checkIn
        }
    }
}