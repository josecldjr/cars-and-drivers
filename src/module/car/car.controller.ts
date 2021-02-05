import { Body, Controller, Inject, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Car } from '../../entity/car.entity';
import { CarService } from './car.service';
import { SaveCarResquestDTO } from './dto/save-car.dto';

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
}
