import { getMockDriver } from '../../../test/utils/mock-data.utils';
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
});
