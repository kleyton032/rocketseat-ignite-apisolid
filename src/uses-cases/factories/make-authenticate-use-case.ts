import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "@/uses-cases/authenticate/authenticate";

export function makeAuthenticateUseCase() {
    const usersRepository = new PrismaUserRepository
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    return authenticateUseCase
}