import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { GenericSerchReturnDTO } from '../../commom/dto/generic-search.dto';
import { Allocation } from '../../entity/allocation.entity';
import { AllocationService } from './allocation.service';
import { AllocateCarRequestDTO } from './dto/allocate-car.dto';
import { SearchAllocationRequestDTO } from './dto/search-allocations.dto';

@Controller('allocation')
export class AllocationController {

    constructor(
        @Inject(AllocationService) private readonly allocationService: AllocationService,
    ) { }

    @Post()
    async allocateCar(@Body() allocationData: AllocateCarRequestDTO): Promise<Allocation> {
        return this.allocationService.allocateCar(allocationData.carId, allocationData.driverId, allocationData.observation)
    }

    @Get()
    async search(@Query() filters: SearchAllocationRequestDTO): Promise<GenericSerchReturnDTO<Allocation>> {
        return this.allocationService.search(filters)
    }
}
