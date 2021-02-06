import { getMockAllocation } from '../../../test/utils/mock-data.utils';
import { GenericSerchReturnDTO } from '../../commom/dto/generic-search.dto';
import { Allocation } from '../../entity/allocation.entity';
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

  describe('search', () => {
    const allocationService = new AllocationService(null as any, null as any, null as any)
    const allocationController = new AllocationController(allocationService)

    let spySearch: jest.SpyInstance

    beforeEach(() => {
      spySearch = jest.spyOn(allocationService, 'search')

    })

    afterEach(() => {
      spySearch.mockClear()
    })

    it('success', async () => {
      const expectedResult: GenericSerchReturnDTO<Allocation> = {
        list: [await getMockAllocation(), await getMockAllocation(), await getMockAllocation()],
        totalResults: 52
      }

      spySearch.mockResolvedValue(expectedResult)

      const result = await allocationController.search({})

      expect(spySearch).toBeCalled()
      expect(result).toEqual(expectedResult)
    })
  })
});
