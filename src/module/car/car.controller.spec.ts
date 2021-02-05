import { getMockCar } from "../../../test/utils/mock-data.utils";
import { CarController } from "./car.controller";
import { CarService } from "./car.service";

describe('CarController', () => {

  describe('create/update', () => {

    const carService = new CarService(null as any)
    const carController = new CarController(carService)

    let spySave: jest.SpyInstance

    beforeEach(() => {
      spySave = jest.spyOn(carService, 'save')
    })

    afterEach(() => {
      spySave.mockClear()
    })

    it('create', async () => {
      const expectedResult = await getMockCar()

      spySave.mockResolvedValue(expectedResult)

      const result = await carController.create({ brand: 'aaa', color: 'aaaa', licencePlate: 'aaaa' })

      expect(spySave).toHaveBeenCalled()
      expect(result).toEqual(expectedResult)
    })
    it('update', async () => {
      const expectedResult = await getMockCar()

      spySave.mockResolvedValue(expectedResult)

      const result = await carController.update(1, { brand: 'aaa', color: 'aaaa', licencePlate: 'aaaa' })

      expect(spySave).toHaveBeenCalled()
      expect(result).toEqual(expectedResult)
    })

  })
});