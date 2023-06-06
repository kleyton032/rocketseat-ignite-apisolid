import { CheckIn } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import dayjs from "dayjs";
import { LateCheckInValidationError } from "../errors/late-check-in-validation-error";

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

        const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
            checkIn.created_at,
            'minutes',
        )

        if(distanceInMinutesFromCheckInCreation){
            throw new LateCheckInValidationError()
        }

        checkIn.validated_at = new Date()

        await this.checkInsRepository.save(checkIn)

        return {
            checkIn
        }
    }
}