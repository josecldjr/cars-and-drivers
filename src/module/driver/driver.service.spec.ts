import { Repository } from "typeorm"
import { getMockDriver } from "../../../test/utils/mock-data.utils"
import { Driver } from "../../entity/driver.entity"
import { DriverService } from "./driver.service"
import { DriverModuleMessages } from "./messages.enum"

describe('DriverService', () => {

    describe('save', () => {

        const driverRepository = new Repository<Driver>()
        const driverService = new DriverService(driverRepository)


        let spySaveDriver: jest.SpyInstance
        let spyGetDriver: jest.SpyInstance

        beforeEach(() => {
            spySaveDriver = jest.spyOn(driverRepository, 'save')
            spyGetDriver = jest.spyOn(driverService, 'get')
        })

        afterEach(() => {
            spySaveDriver.mockClear()
            spyGetDriver.mockClear()
        })

        it('create a driver successfully', async () => {
            const expectedResult = await getMockDriver()

            spySaveDriver.mockResolvedValue(expectedResult)

            const result = await driverService.save({ name: 'aksodkasodkoas' })

            expect(spySaveDriver).toBeCalled()
            expect(result).toEqual(expectedResult)
        })

        it('update failed de to driver not found', async () => {
            let errorCode = 0
            let errorMessage = ''

            spyGetDriver.mockResolvedValue(undefined)

            try {
                await driverService.save({ name: '' }, 1)

            } catch (error) {
                errorCode = error.status
                errorMessage = error.message
            }

            expect(spyGetDriver).toBeCalled()
            expect(spySaveDriver).not.toHaveBeenCalled()
            expect(errorCode).toBe(404)
            expect(errorMessage).toBe(DriverModuleMessages.driverNotFound)
        })

        it('update driver successfully', async () => {
            const expectedResult = await getMockDriver()

            spySaveDriver.mockResolvedValue(expectedResult)
            spyGetDriver.mockResolvedValue(expectedResult)


            const result = await driverService.save({ name: 'aksodkasodkoas' }, 1)

            expect(spySaveDriver).toBeCalled()
            expect(spyGetDriver).toBeCalled()
            expect(result).toEqual(expectedResult)
        })


    })

    describe('get', () => {

        const driverRepository = new Repository<Driver>()
        const driverService = new DriverService(driverRepository)

        let spyFindOne: jest.SpyInstance

        beforeEach(() => {
            spyFindOne = jest.spyOn(driverRepository, 'findOne')

        })

        afterEach(() => {
            spyFindOne.mockClear()

        })

        it('driver not found | return undefined', async () => {

            spyFindOne.mockResolvedValue(undefined)

            const result = await driverService.get(1)

            expect(result).toBeUndefined()
        })

        it('driver not found | throw an error', async () => {
            let errorCode = 0
            let errorMessage = ''

            spyFindOne.mockResolvedValue(undefined)

            try {
                await driverService.get(1, true)

            } catch (error) {
                errorCode = error.status
                errorMessage = error.message

            }

            expect(errorCode).toBe(404)
            expect(errorMessage).toBe(DriverModuleMessages.driverNotFound)
        })
    })
})