import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './checkin'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxDistanceError } from '../errors/max-distance-error'
import { MaxNumberOfCheckInsError } from '../errors/max-number-of-check-in-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {

    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        gymsRepository = new InMemoryGymsRepository()
        sut = new CheckInUseCase(checkInsRepository, gymsRepository)

        await gymsRepository.create({
            title: 'Gym Qualquer',
            description: '',
            phone: '',
            latitude: -8.0277391,
            longitude: -34.8955189
        })


        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to check in', async () => {

        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -8.0277391,
            userLongitude: -34.8955189
        })

        expect(checkIn.id).toEqual(expect.any(String))

    })

    it('should be able to check in twice in the same day', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -8.0277391,
            userLongitude: -34.8955189
        })

        await expect(() =>
            sut.execute({
                gymId: 'gym-01',
                userId: 'user-01',
                userLatitude: -8.0277391,
                userLongitude: -34.8955189
            })
        ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
    })


    it('should be able to check in twice but in diferrent days', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -8.0277391,
            userLongitude: -34.8955189
        })

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -8.0277391,
            userLongitude: -34.8955189
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should be able to check in on distant gym', async () => {

        gymsRepository.items.push({
            id: 'gym-02',
            title: 'Gym Qualquer',
            description: '',
            phone: '',
            latitude: new Decimal(-8.0157879),
            longitude: new Decimal(-34.9003464)
        })

        await expect(() =>
            sut.execute({
                gymId: 'gym-02',
                userId: 'user-01',
                userLatitude: -8.0277391,
                userLongitude: -34.8955189
            }),
        ).rejects.toBeInstanceOf(MaxDistanceError)
    })

})

