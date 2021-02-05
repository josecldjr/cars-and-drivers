import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { GenericSerchReturnDTO } from '../../commom/dto/generic-search.dto';
import { Car } from '../../entity/car.entity';
import { CarService } from './car.service';
import { SaveCarResquestDTO } from './dto/save-car.dto';
import { SearchCarRequestDTO } from './dto/search-car.dto';

@Controller('car')
export class CarController {

    constructor(
        @Inject(CarService) private readonly carService: CarService,
    ) { }

    @Post()
    create(@Body() data: SaveCarResquestDTO): Promise<Car> {
        return this.carService.save(data)
    }

    @Put('/:driverId')
    update(@Param('driverId', ParseIntPipe) driverId: number, @Body() data: SaveCarResquestDTO): Promise<Car> {
        return this.carService.save(data, driverId)
    }

    @Get()
    search(@Query() filters: SearchCarRequestDTO): Promise<GenericSerchReturnDTO<Car>> {
        return this.carService.search(filters)
    }
}
