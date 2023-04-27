import { GymsRepository } from "@/repositories/gyms-repository"
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { afterEach, beforeEach, describe, expect, it } from "vitest"
import { CreateGymUseCase } from "./create-gym"

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {

    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new CreateGymUseCase(gymsRepository)

    })

    it('should be able to create gym', async () => {
        
        const { gym } = await sut.execute({
            title: 'Gym Qualquer',
            description: '',
            phone: '',
            latitude: -8.0277391,
            longitude: -34.8955189
        })

        expect(gym.id).toEqual(expect.any(String))

    })

})
