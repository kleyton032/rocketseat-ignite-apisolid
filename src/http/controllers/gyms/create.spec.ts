import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/ultis/test/create-and-authenticate-user'


describe('Create Gym (e2e)', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to get user profile', async () => {
        const { token } = await createAndAuthenticateUser(app)

        const response = await request(app.server)
            .get('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Gym Qualquer',
                description:'Some Description', 
                phone: '81988888888', 
                latitude: -8.0277391,
                longitude: -34.8955189
            })

        expect(response.statusCode).toEqual(200)
    
    })
})