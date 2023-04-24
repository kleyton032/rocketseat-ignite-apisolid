import { UsersRepository } from "@/repositories/users-repository";
import { CheckIn} from "@prisma/client";
import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface CheckInUseCaseRequest {
   userId: string,
   gymId: string
}

interface CheckInUseCaseResponde {
    checkIn: CheckIn
}

export class CheckInUseCase {
    constructor(private checkInsRepository: CheckInsRepository) { }

    async execute({ userId, gymId }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponde> {
        const checkIn = await this.checkInsRepository.create({
            user_id: userId,
            gym_id: gymId
        })

        return {
           checkIn
        }
    }
}