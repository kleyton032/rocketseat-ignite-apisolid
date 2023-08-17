
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreateGymUseCase } from '@/uses-cases/factories/make-create-gym-use-case'
import { makeFetchNearbyGymsUseCase } from '@/uses-cases/factories/make-fetch-nearby-gyms-use-case'

export async function nearby(req: FastifyRequest, res: FastifyReply) {
    const nearbyGymsQuerySchema = z.object({
        latitude: z.number().refine((value) => {
            return Math.abs(value) <= 90
        }),

        longitude: z.number().refine((value) => {
            return Math.abs(value) <= 180
        })
    })

    const { latitude, longitude } = nearbyGymsQuerySchema.parse(req.body)

    const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase()


    const { gyms } = await fetchNearbyGymsUseCase.execute({
       userLatitude: latitude,
       userLongitude:longitude
    })
    
    return res.status(200).send({
        gyms
    })

}