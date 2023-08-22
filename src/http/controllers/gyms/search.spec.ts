import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/ultis/test/create-and-authenticate-user'


describe('Search Gym (e2e)', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to get user profile', async () => {
        const { token } = await createAndAuthenticateUser(app)


        await request(app.server)
            .get('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Gym Qualquer 1',
                description:'Some Description', 
                phone: '81988888888', 
                latitude: -8.0277391,
                longitude: -34.8955189
            })


        await request(app.server)
            .get('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Gym Qualquer 2',
                description:'Some Description', 
                phone: '81988888888', 
                latitude: -8.0277391,
                longitude: -34.8955189
            })

            const response = await request(app.server)
            .get('/gyms/searc')
            .query({
                q: 'Qualquer'
            })
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: 'Gym Qualquer 1'
            })
        ])
    
    })
})