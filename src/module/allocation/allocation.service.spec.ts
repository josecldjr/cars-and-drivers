import { Repository } from "typeorm"
import { getMockAllocation, getMockCar, getMockDriver } from "../../../test/utils/mock-data.utils"
import { CarMessages } from "../../commom/enum/car-messages.enum"
import { DriverModuleMessages } from "../../commom/enum/driver-messages.enum"
import { maximumCarsAllowed } from "../../config/constants"
import { Allocation } from "../../entity/allocation.entity"
import { CarService } from "../car/car.service"
import { DriverService } from "../driver/driver.service"
import { AllocationService } from "./allocation.service"
import { SearchAllocationRequestDTO } from "./dto/search-allocations.dto"

describe('AllocationService', () => {

    describe('checkCarAvailability', () => {
        const allocationRepository = new Repository<Allocation>()
        const allocationService = new AllocationService(allocationRepository, null as any, null as any)

        let spyCount: jest.SpyInstance

        beforeEach(() => {
            spyCount = jest.spyOn(allocationRepository, 'count')
        })

        afterEach(() => {
            spyCount.mockClear()
        })

        it('Car is available', async () => {
            spyCount.mockResolvedValue(0)

            const result = await allocationService.checkCarAvailability(1)

            expect(result).toBe(true)
        })

        it('Car is not available', async () => {
            spyCount.mockResolvedValue(1)

            const result = await allocationService.checkCarAvailability(1)

            expect(result).toBe(false)
        })

    })

    describe('checkDriverAllocatedCars', () => {

        const allocationRepository = new Repository<Allocation>()
        const allocationService = new AllocationService(allocationRepository, null as any, null as any)

        let spyCount: jest.SpyInstance

        beforeEach(() => {
            spyCount = jest.spyOn(allocationRepository, 'count')
        })

        afterEach(() => {
            spyCount.mockClear()
        })

        it('No cars allocated', async () => {
            spyCount.mockResolvedValue(0)

            const result = await allocationService.checkCarAvailability(1)

            expect(result).toBe(true)
        })

        it('Some random number of cars allocated', async () => {
            const randomInt = () => Math.trunc(Math.random() * 99)
            const expectedValue = randomInt()

            spyCount.mockResolvedValue(expectedValue)

            const result = await allocationService.checkDriverAllocatedCars(1)

            expect(result).toBe(expectedValue)
        })


    })

    describe('allocateCar', () => {

        const allocationRepository = new Repository<Allocation>()
        const carService = new CarService(null as any)
        const driverService = new DriverService(null as any)

        const allocationService = new AllocationService(allocationRepository, carService, driverService)

        let spyGetDriver: jest.SpyInstance
        let spyGetCar: jest.SpyInstance

        let spyCheckCarAvailability: jest.SpyInstance
        let spyCheckDriverAllocatedCars: jest.SpyInstance

        let spySave: jest.SpyInstance

        beforeEach(() => {
            spyGetDriver = jest.spyOn(driverService, 'get')
            spyGetCar = jest.spyOn(carService, 'get')

            spyCheckCarAvailability = jest.spyOn(allocationService, 'checkCarAvailability')
            spyCheckDriverAllocatedCars = jest.spyOn(allocationService, 'checkDriverAllocatedCars')

            spySave = jest.spyOn(allocationRepository, 'save')
        })

        afterEach(() => {
            spyGetDriver.mockClear()
            spyGetCar.mockClear()
            spyCheckCarAvailability.mockClear()
            spyCheckDriverAllocatedCars.mockClear()
            spySave.mockClear()
        })

        // car is already in use
        // driver cant use more cars
        // success
        it('car is already in use', async () => {
            const mockCar = await getMockCar()
            const mockDriver = await getMockDriver()

            let errorCode = 0
            let errorMessage = ''

            spyGetCar.mockResolvedValue(mockCar)
            spyGetDriver.mockResolvedValue(mockDriver)
            spyCheckCarAvailability.mockImplementation(async () => false)

            try {
                await allocationService.allocateCar(1, 1, 'observation')

            } catch (error) {

                errorMessage = error.message
                errorCode = error.status

            }

            expect(spyGetCar).toBeCalled()
            expect(spyGetDriver).toBeCalled()
            expect(spyCheckCarAvailability).toBeCalled()
            expect(errorCode).toBe(400)
            expect(errorMessage).toBe(CarMessages.carIsAlreadyInUse)
        })

        it('driver cant use anymore car', async () => {
            const mockCar = await getMockCar()
            const mockDriver = await getMockDriver()

            let errorCode = 0
            let errorMessage = ''

            spyGetCar.mockResolvedValue(mockCar)
            spyGetDriver.mockResolvedValue(mockDriver)
            spyCheckCarAvailability.mockImplementation(async () => true)
            spyCheckDriverAllocatedCars.mockImplementation(async () => maximumCarsAllowed)

            try {
                await allocationService.allocateCar(1, 1, 'observation')

            } catch (error) {

                errorMessage = error.message
                errorCode = error.status

            }

            expect(spyGetCar).toBeCalled()
            expect(spyGetDriver).toBeCalled()
            expect(spyCheckCarAvailability).toBeCalled()
            expect(spyCheckDriverAllocatedCars).toBeCalled()
            expect(errorCode).toBe(400)
            expect(errorMessage).toBe(DriverModuleMessages.cantAllocateMoreCarsToDriver)
        })


        it('success', async () => {
            const mockCar = await getMockCar()
            const mockDriver = await getMockDriver()
            const mockAllocation = await getMockAllocation()

            spyGetCar.mockResolvedValue(mockCar)
            spyGetDriver.mockResolvedValue(mockDriver)
            spyCheckCarAvailability.mockImplementation(async () => true)
            spyCheckDriverAllocatedCars.mockImplementation(async () => maximumCarsAllowed - 1)
            spySave.mockResolvedValue(mockAllocation)

            const result = await allocationService.allocateCar(1, 1, 'observation')


            expect(spyGetCar).toBeCalled()
            expect(spyGetDriver).toBeCalled()
            expect(spyCheckCarAvailability).toBeCalled()
            expect(spyCheckDriverAllocatedCars).toBeCalled()
            expect(spySave).toBeCalled()
            expect(result).toEqual({ ...mockAllocation, car: mockCar, driver: mockDriver })
        })

    })

    describe('search', () => {
        const allocationRepository = new Repository<Allocation>()
        const allocationService = new AllocationService(allocationRepository, null, null)

        let spyFindAndCount: jest.SpyInstance

        beforeEach(() => {
            spyFindAndCount = jest.spyOn(allocationRepository, 'findAndCount')
        })

        afterEach(() => {
            spyFindAndCount.mockClear()
        })
        it('success | test with many filters', async () => {

            const expectedResultList = [await getMockAllocation(), await getMockAllocation(), await getMockAllocation()]
            const expectedResultTotal = 32

            spyFindAndCount.mockResolvedValue([expectedResultList, expectedResultTotal])

            const inputs: SearchAllocationRequestDTO[] = [
                { activeOnly: true, carId: 1, driverId: 1, page: 1, pageSize: 20 },
                { activeOnly: true },
                { activeOnly: false },
                { carId: 1, },
                { driverId: 1, },
                { page: 1 },
                { pageSize: 20 },
                { page: 1, pageSize: 20 },
                {},
            ]

            const results = await Promise.all(inputs.map(input => allocationService.search(input)))

            expect(spyFindAndCount).toBeCalledTimes(inputs.length)
            results.forEach(result => {
                expect(result.list).toEqual(expectedResultList)
                expect(result.totalResults).toBe(expectedResultTotal)
            })

        })

    })
})