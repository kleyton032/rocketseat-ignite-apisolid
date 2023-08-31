import { FastifyReply, FastifyRequest } from "fastify";

export function verifyUserRole(role: 'ADMIN' | 'MEMBER') {
    return async (req: FastifyRequest, res: FastifyReply) => {

        const { role } = req.user
        if (role != role) {
            return res.status(401).send({ message: 'Unauthorized.' })
        }

    }

}