import { Body, Controller, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
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

    @Patch(':allocationId')
    async finalize(@Param('allocationId', ParseIntPipe) allocationId: number): Promise<void> {
        await this.allocationService.finalizeAllocation(allocationId)
    }

}
