import { Body, Controller, Inject, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Driver } from '../../entity/driver.entity';
import { DriverService } from './driver.service';
import { SaveDriverDTO } from './dto/save-drive.dto';

@Controller('driver')
export class DriverController {

    constructor(
        @Inject(DriverService) private readonly driverService: DriverService,
    ) { }

    @Post()
    create(@Body() driverData: SaveDriverDTO): Promise<Driver> {
        return this.driverService.save(driverData)
    }

    @Put('/:driverId')
    update(@Param('driverId', ParseIntPipe) driverId: number, @Body() driverData: SaveDriverDTO): Promise<Driver> {
        return this.driverService.save(driverData, driverId)
    }
}
