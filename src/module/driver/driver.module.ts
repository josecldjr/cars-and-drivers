import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from '../../entity/driver.entity';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';

@Module({
  controllers: [DriverController],
  imports: [TypeOrmModule.forFeature([Driver])],
  providers: [DriverService],
})
export class DriverModule { }
