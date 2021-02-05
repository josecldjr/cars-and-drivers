import { Repository } from "typeorm"
import { getMockCar } from "../../../test/utils/mock-data.utils"
import { CarMessages } from "../../commom/enum/car-messages.enum"
import { Car } from "../../entity/car.entity"
import { CarService } from "./car.service"
import { SearchCarRequestDTO } from "./dto/search-car.dto"


describe('CarService', () => {

    describe('get', () => {

        const carRepository = new Repository<Car>()
        const carService = new CarService(carRepository)

        let spyFindOne: jest.SpyInstance

        beforeEach(() => {
            spyFindOne = jest.spyOn(carRepository, 'findOne')
        })

        afterEach(() => {
            spyFindOne.mockClear()
        })

        it('error with undefined', async () => {

            spyFindOne.mockResolvedValue(undefined)

            const result = await carService.get(1)

            expect(spyFindOne).toBeCalled()
            expect(result).toBeUndefined()

        })

        it('error with throw', async () => {
            let errorCode = 0
            let errorMessage = ''

            spyFindOne.mockResolvedValue(undefined)


            try {
                await carService.get(1, true)

            } catch (error) {
                errorCode = error.status
                errorMessage = error.message
            }

            expect(spyFindOne).toBeCalled()
            expect(errorCode).toBe(404)
            expect(errorMessage).toBe(CarMessages.carNotFound)

        })


        it('error with undefined', async () => {
            const expectedResult = await getMockCar()

            spyFindOne.mockResolvedValue(expectedResult)

            const result = await carService.get(1)

            expect(spyFindOne).toBeCalled()
            expect(result).toEqual(expectedResult)

        })
    })

    describe('save', () => {
        const carRepository = new Repository<Car>()
        const carService = new CarService(carRepository)

        let spySave: jest.SpyInstance
        let spyGet: jest.SpyInstance

        beforeEach(() => {
            spySave = jest.spyOn(carRepository, 'save')
            spyGet = jest.spyOn(carService, 'get')
        })

        afterEach(() => {
            spySave.mockClear()
            spyGet.mockClear()
        })

        it('create', async () => {
            const expectedResult = await getMockCar()

            spySave.mockResolvedValue(expectedResult)

            const result = await carService.save({ brand: 'Ford ka', color: 'Gray', licencePlate: 'DDS56A9' })

            expect(spySave).toHaveBeenCalled()
            expect(result).toEqual(expectedResult)

        })

        it('update', async () => {
            const expectedResult = await getMockCar()

            spySave.mockResolvedValue(expectedResult)

            const result = await carService.save({ brand: 'Ford ka', color: 'Gray', licencePlate: 'DDS56A9' })

            expect(spySave).toHaveBeenCalled()
            expect(result).toEqual(expectedResult)
        })


        it('error on duplicated licencePlate field', async () => {
            const expectedResult = await getMockCar()
            let errorCode = 0
            let errorMessage = ''

            spySave.mockRejectedValue({ code: 'ER_DUP_ENTRY' })

            try {
                await carService.save({ brand: 'Ford ka', color: 'Gray', licencePlate: 'DDS56A9' })
            } catch (error) {
                errorCode = error.status
                errorMessage = error.message
            }

            expect(spySave).toHaveBeenCalled()
            expect(errorCode).toBe(400)
            expect(errorMessage).toBe(CarMessages.licencePlantAlreadyRegistered)
        })
    })

    describe('search', () => {

        const carRepository = new Repository<Car>()
        const carService = new CarService(carRepository)

        let spyFindAndCount: jest.SpyInstance

        beforeEach(() => {
            spyFindAndCount = jest.spyOn(carRepository, 'findAndCount')
        })

        afterEach(() => {
            spyFindAndCount.mockClear()
        })

        it('success', async () => {
            const expectResultList = [await getMockCar(), await getMockCar(), await getMockCar()]
            const expectResultTotal = 100

            spyFindAndCount.mockResolvedValue([expectResultList, expectResultTotal])

            const inputs: SearchCarRequestDTO[] = [
                { brand: 'aaaa', color: 'red', licencePlate: 'ADD3242' },
                { brand: 'aaaa' },
                { color: 'red' },
                { licencePlate: 'ADD3242' },
            ]

            const results = await Promise.all(inputs.map(input => carService.search(input)))

            expect(spyFindAndCount).toHaveBeenCalledTimes(inputs.length)

            results.forEach(result => {
                expect(expectResultList).toEqual(result.list)
                expect(expectResultTotal).toEqual(result.totalResults)
            })

        })
    })
})