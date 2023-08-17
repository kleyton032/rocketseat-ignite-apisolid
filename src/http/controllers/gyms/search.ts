
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreateGymUseCase } from '@/uses-cases/factories/make-create-gym-use-case'
import { makeSearchGymsUseCase } from '@/uses-cases/factories/make-search-gyms-use-case'

export async function search(req: FastifyRequest, res: FastifyReply) {
    const searchGymsQuerySchema = z.object({
        query: z.string(),
        page: z.coerce.number().min(1).default(1),
    })

    const { query, page } = searchGymsQuerySchema.parse(req.body)

    const searchGymsUseCase = makeSearchGymsUseCase()


    const { gyms } = await searchGymsUseCase.execute({
        query: query,
        page,
    })
    
    return res.status(200).send({
        gyms
    })

}