import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from '../../entity/car.entity';
import { CarController } from './car.controller';
import { CarService } from './car.service';

@Module({
  controllers: [CarController],
  imports: [TypeOrmModule.forFeature([Car])],
  providers: [CarService],
  exports: [CarService]
})
export class CarModule { }
