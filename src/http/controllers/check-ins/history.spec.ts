import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/ultis/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'


describe('History Check-in (e2e)', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to list history of check-in', async () => {
        const { token } = await createAndAuthenticateUser(app)

       const gym =  await prisma.gym.create({
            data: {
                title: "Gym Qualquer",
                latitude: -8.0277391,
                longitude: -34.8955189

            }
        })

        const response = await request(app.server)
            .post(`/gyms/${gym.id}/check-ins`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                latitude: -8.0277391,
                longitude: -34.8955189
            })

        expect(response.statusCode).toEqual(200)

    })
})