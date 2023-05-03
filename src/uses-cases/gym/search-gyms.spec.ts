import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {

    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new SearchGymsUseCase(gymsRepository)

    })

    it('should be able to check ins history', async () => {

        await gymsRepository.create({
           title: 'Qualquer Gym',
           description: '',
           phone: '',
           latitude: -8.0277391,
           longitude: -34.8955189

        })

        await gymsRepository.create({
            title: 'Alguma Gym',
            description: '',
            phone: '',
            latitude: -8.0277391,
            longitude: -34.8955189
        })

        const { gyms } = await sut.execute({
            query: "Qualquer",
            page: 1

        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'Qualquer Gym' }),
        ])

    })


    it('should be able to paginated check ins history', async () => {

        for (let i = 1; i <= 22; i++) {
            await gymsRepository.create({
                title: `Qualquer Gym ${i}`,
                description: '',
                phone: '',
                latitude: -8.0277391,
                longitude: -34.8955189
     
             })
        }

        const { gyms } = await sut.execute({
            query: 'Qualquer',
            page: 2

        })

        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'Qualquer Gym 21' }),
            expect.objectContaining({ title: 'Qualquer Gym 22' }),
        ])

    })

})

