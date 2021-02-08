import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
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
    async create(@Body() data: SaveCarResquestDTO): Promise<Car> {
        return this.carService.save(data)
    }

    @Put('/:driverId')
    async update(@Param('driverId', ParseIntPipe) driverId: number, @Body() data: SaveCarResquestDTO): Promise<Car> {
        return this.carService.save(data, driverId)
    }

    @Get()
    async search(@Query() filters: SearchCarRequestDTO): Promise<GenericSerchReturnDTO<Car>> {
        return this.carService.search(filters)
    }

    @Get('/:carId')
    async get(@Param('carId', ParseIntPipe) carId: number): Promise<Car> {
        return this.carService.get(carId, true)
    }

    @Delete('/:carId')
    async delete(@Param('carId', ParseIntPipe) carId: number): Promise<void> {
        await this.carService.delete(carId)
    }
}
