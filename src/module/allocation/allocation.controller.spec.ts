import { getMockAllocation } from '../../../test/utils/mock-data.utils';
import { AllocationController } from './allocation.controller';
import { AllocationService } from './allocation.service';

describe('AllocationController', () => {

  describe('allocate', () => {
    const allocationService = new AllocationService(null as any, null as any, null as any)
    const allocationController = new AllocationController(allocationService)

    let spyAllocate: jest.SpyInstance

    beforeEach(() => {
      spyAllocate = jest.spyOn(allocationService, 'allocateCar')

    })

    afterEach(() => {
      spyAllocate.mockClear()
    })

    it('success', async () => {
      const expectedResult = await getMockAllocation()

      spyAllocate.mockResolvedValue(expectedResult)

      const result = await allocationController.allocateCar({ carId: 1, driverId: 1, observation: 'askodkas' })

      expect(spyAllocate).toBeCalled()
      expect(result).toEqual(expectedResult)
    })
  })
});
