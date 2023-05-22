import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {

    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new FetchNearbyGymsUseCase(gymsRepository)

    })

    it('should be able to fecth nearby gyms', async () => {

        await gymsRepository.create({
           title: 'Near Gym',
           description: '',
           phone: '',
           latitude: -8.0277391,
           longitude: -34.8955189

        })

        await gymsRepository.create({
            title: 'Far Gym',
            description: '',
            phone: '',
            latitude: -8.1538896,
            longitude: -35.4700247
        })

        const { gyms } = await sut.execute({
            userLatitude: -8.0277391,
            userLongitude: -34.8955189

        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'Near Gym' }),
        ])

    })

})

