
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreateGymUseCase } from '@/uses-cases/factories/make-create-gym-use-case'
import { makeCheckinInUseCase } from '@/uses-cases/factories/make-check-in-use-case'

export async function create(req: FastifyRequest, res: FastifyReply) {

    const createCheckInParamsSchema = z.object({
        gymId: z.string().uuid(),
    })

    const createCheckInBodySchema = z.object({

        latitude: z.number().refine((value) => {
            return Math.abs(value) <= 90
        }),

        longitude: z.number().refine((value) => {
            return Math.abs(value) <= 180
        })
    })

    const { gymId } = createCheckInParamsSchema.parse(req.params)
    const { latitude, longitude } = createCheckInBodySchema.parse(req.body)


    const checkInUseCase = makeCheckinInUseCase()
    
    await checkInUseCase.execute({
        gymId,
        userId: req.user.sub,
        userLatitude: latitude,
        userLongitude: longitude
    })



    return res.status(200).send({})

}