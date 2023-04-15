
import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from "@/lib/prisma"
import { hash } from 'bcryptjs'
import { z } from 'zod'
import { RegisterUseCase } from '@/uses-cases/register'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'

export async function register(req: FastifyRequest, res: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { name, email, password } = registerBodySchema.parse(req.body)

    try {
        const userRepository = new PrismaUserRepository()
        const registerUseCase = new RegisterUseCase(userRepository)
        
        await registerUseCase.execute({
            name,
            email,
            password
        })

    } catch (error) {
        return res.status(409).send()
    }


    return res.status(201).send()

}