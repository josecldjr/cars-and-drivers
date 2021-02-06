import { Body, Controller, Inject, Post } from '@nestjs/common';
import { Allocation } from '../../entity/allocation.entity';
import { AllocationService } from './allocation.service';
import { AllocateCarRequestDTO } from './dto/allocate-car.dto';

@Controller('allocation')
export class AllocationController {

    constructor(
        @Inject(AllocationService) private readonly allocationService: AllocationService,
    ) { }

    @Post()
    async allocateCar(@Body() allocationData: AllocateCarRequestDTO): Promise<Allocation> {
        return this.allocationService.allocateCar(allocationData.carId, allocationData.driverId, allocationData.observation)
    }
}
