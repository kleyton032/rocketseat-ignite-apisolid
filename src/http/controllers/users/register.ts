
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExistsError } from '@/uses-cases/errors/user-already-exists-error'
import { makeRegisterUseCase } from '@/uses-cases/factories/make-register-use-case'
import { RegisterUseCase } from '@/uses-cases/register/register'

export async function register(req: FastifyRequest, res: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { name, email, password } = registerBodySchema.parse(req.body)

    try {
        const registerUseCase = makeRegisterUseCase()
        await registerUseCase.execute({
            name,
            email,
            password
        })

    } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
            return res.status(409).send({ message: error.message })
        }

        throw error
    }

    return res.status(200).send()

}