
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeValidateCheckinUseCase } from '@/uses-cases/factories/make-validate-checkin-in-use-case'

export async function validate(req: FastifyRequest, res: FastifyReply) {

    const validadeCheckInParamsSchema = z.object({
        checkInId: z.string().uuid(),
    })

    const { checkInId } = validadeCheckInParamsSchema.parse(req.params)
    

    const validateCheckInUseCase = makeValidateCheckinUseCase()
    
    await validateCheckInUseCase.execute({
       checkInId
    })


    return res.status(204).send()

}