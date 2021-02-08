import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Allocation } from '../../entity/allocation.entity';
import { Car } from '../../entity/car.entity';
import { Driver } from '../../entity/driver.entity';
import { CarModule } from '../car/car.module';
import { CarService } from '../car/car.service';
import { DriverService } from '../driver/driver.service';
import { AllocationController } from './allocation.controller';
import { AllocationService } from './allocation.service';

@Module({
  controllers: [AllocationController],
  imports: [TypeOrmModule.forFeature([Allocation, Driver, Car]), DiscoveryModule, CarModule],
  providers: [AllocationService, DriverService, CarService],
})
export class AllocationModule { }
