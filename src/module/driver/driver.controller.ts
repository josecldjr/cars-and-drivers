import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { GenericSerchReturnDTO } from '../../commom/dto/generic-search.dto';
import { Driver } from '../../entity/driver.entity';
import { DriverService } from './driver.service';
import { SaveDriverDTO } from './dto/save-drive.dto';
import { SearchDriversDTO } from './dto/search-drivers.dto';

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

    @Get()
    search(@Query() filters: SearchDriversDTO): Promise<GenericSerchReturnDTO<Driver>> {
        return this.driverService.search(filters)
    }

    @Delete('/:driverId')
    delete(@Param('driverId') driverId: number): Promise<void> {
        return this.driverService.delete(driverId)
    }

}
