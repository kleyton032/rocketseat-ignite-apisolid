
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '@/uses-cases/authenticate'
import { InvalidCredentialsError } from '@/uses-cases/errors/invalid-credentials-error'

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
    
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { email, password } = authenticateBodySchema.parse(req.body)

    try {
        const userRepository = new PrismaUserRepository()
        const authenticateUseCase = new AuthenticateUseCase(userRepository)

        await authenticateUseCase.execute({
            email,
            password
        })

    } catch (error) {
        if (error instanceof InvalidCredentialsError) {
            return res.status(400).send({ message: error.message })
        }

        throw error
    }


    return res.status(200).send()

}