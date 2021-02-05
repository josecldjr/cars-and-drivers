import { getMockDriver } from '../../../test/utils/mock-data.utils';
import { GenericSerchReturnDTO } from '../../commom/dto/generic-search.dto';
import { Driver } from '../../entity/driver.entity';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';

describe('DriverController', () => {

  describe('create/update', () => {

    const driverService = new DriverService(null as any)
    const driverController = new DriverController(driverService)

    let spySaveDriver: jest.SpyInstance

    beforeEach(() => {
      spySaveDriver = jest.spyOn(driverService, 'save')
    })

    afterEach(() => {
      spySaveDriver.mockClear()

    })

    it('create successfully', async () => {
      const expectedResult = await getMockDriver()

      spySaveDriver.mockResolvedValue(expectedResult)

      const result = await driverController.create({ name: 'aasdasd' })

      expect(spySaveDriver).toHaveBeenCalled()
      expect(result).toEqual(expectedResult)
    })

    it('update successfully', async () => {
      const expectedResult = await getMockDriver()

      spySaveDriver.mockResolvedValue(expectedResult)

      const result = await driverController.update(1, { name: 'aasdasd' })

      expect(spySaveDriver).toHaveBeenCalled()
      expect(result).toEqual(expectedResult)
    })


  })


  describe('search', () => {

    const driverService = new DriverService(null as any)
    const driverController = new DriverController(driverService)
    let spySearch: jest.SpyInstance

    beforeEach(() => {
      spySearch = jest.spyOn(driverService, 'search')

    })

    afterEach(() => {
      spySearch.mockClear()
    })

    it('success', async () => {
      const expectedResult: GenericSerchReturnDTO<Driver> = {
        list: [await getMockDriver(), await getMockDriver()],
        totalResults: 100,
      }

      spySearch.mockResolvedValue(expectedResult)
      const result = await driverController.search({})

      expect(result).toEqual(expectedResult)

    })
  })

  describe('delete', () => {
    const driverService = new DriverService(null as any)
    const driverController = new DriverController(driverService)

    let spyDelete: jest.SpyInstance

    beforeEach(() => {
      spyDelete = jest.spyOn(driverService, 'delete')
    })

    afterEach(() => {
      spyDelete.mockClear()
    })

    it('success', async () => {

      spyDelete.mockImplementation(() => { })

      await driverController.delete(1)

      expect(spyDelete).toBeCalled()
    })

  })

  describe('get', () => {
    const driverService = new DriverService(null as any)
    const driverController = new DriverController(driverService)

    let spyGet: jest.SpyInstance

    beforeEach(() => {
      spyGet = jest.spyOn(driverService, 'get')
    })

    afterEach(() => {
      spyGet.mockClear()
    })

    it('success', async () => {
      const expectedResult = await getMockDriver()

      spyGet.mockResolvedValue(expectedResult)

      const result = await driverController.get(1)

      expect(spyGet).toHaveBeenCalled()
      expect(result).toEqual(expectedResult)
    })

  })
})
