import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindConditions, Like, Repository } from "typeorm";
import { GenericSerchReturnDTO } from "../../commom/dto/generic-search.dto";
import { CarMessages } from "../../commom/enum/car-messages.enum";
import { handlePagination } from "../../commom/utils/query.utils";
import { defaultPageSize, defautlInitialPage } from "../../config/constants";
import { Car } from "../../entity/car.entity";
import { SaveCarResquestDTO } from "./dto/save-car.dto";
import { SearchCarRequestDTO } from "./dto/search-car.dto";

@Injectable()
export class CarService {

    constructor(
        @InjectRepository(Car) private readonly carRepository: Repository<Car>,
    ) { }

    /**
     * Create or update a Car register
     * @param data 
     * @param carId (update only)
     */
    async save(data: SaveCarResquestDTO, carId?: number | undefined) {
        const { brand, color, licencePlate } = data

        let car = new Car()

        if (carId) {
            car = await this.get(carId, true)
        }

        car.brand = brand
        car.color = color
        car.licencePlate = licencePlate.toUpperCase()

        try {
            return await this.carRepository.save(car)

        } catch (error) {
            throw new BadRequestException(CarMessages.licencePlantAlreadyRegistered)

        }
    }

    /**
     * Returns a car by id
     * @param carId 
     * @param throwError 
     */
    async get(carId: number, throwError = false): Promise<Car | undefined> {
        const car = await this.carRepository.findOne(carId)

        if (!car && throwError) {
            throw new NotFoundException(CarMessages.carNotFound)
        }

        return car
    }

    /**
     * Return
     * @param filters 
     */
    async search(filters: SearchCarRequestDTO): Promise<GenericSerchReturnDTO<Car>> {
        const { brand, color, licencePlate, page = defautlInitialPage, pageSize = defaultPageSize } = filters
        const where: FindConditions<Car> = {}

        if (brand) {
            where.brand = Like(`%${brand}%`)
        }

        if (color) {
            where.color = Like(`%${color}%`)
        }

        if (licencePlate) {
            where.licencePlate = Like(`%${licencePlate}%`)
        }

        const { skip, take } = handlePagination(page, pageSize)
        const [list, totalResults] = await this.carRepository.findAndCount({
            where,
            order: { brand: 'ASC' },
            skip,
            take,
        })

        return {
            list,
            totalResults,
        }
    }
}