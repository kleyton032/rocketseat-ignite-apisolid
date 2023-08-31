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

    it('should be able to search gyms by title', async () => {
        const { token } = await createAndAuthenticateUser(app, true)


        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Nenhuma Gym',
                description:'Some Description', 
                phone: '81988888888', 
                latitude: -8.0277391,
                longitude: -34.8955189
            })


        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Outra Gym',
                description:'Some Description', 
                phone: '81988888888', 
                latitude: -8.0277391,
                longitude: -34.8955189
            })

            const response = await request(app.server)
            .get('/gyms/search')
            .query({
                query: 'Nenhuma'
            })
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: 'Nenhuma Gym'
            })
        ])
    
    })
})