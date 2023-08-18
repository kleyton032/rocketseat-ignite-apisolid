
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeFetchUserCheckinHistoryUseCase } from '@/uses-cases/factories/make-check-ins-history-use-case'

export async function history(req: FastifyRequest, res: FastifyReply) {
    const checkInHistoryQuerySchema = z.object({
        page: z.coerce.number().min(1).default(1),
    })

    const { page } = checkInHistoryQuerySchema.parse(req.query)

    const fetchUserCheckInHistoryUseCase = makeFetchUserCheckinHistoryUseCase()


    const { checkIns } = await fetchUserCheckInHistoryUseCase.execute({
        userId: req.user.sub,
        page,
    })
    
    return res.status(200).send({
        checkIns
    })

}