import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindConditions, IsNull, Not, Repository } from "typeorm";
import { GenericSerchReturnDTO } from "../../commom/dto/generic-search.dto";
import { AllocationMessages } from "../../commom/enum/allocation-message.enum";
import { CarMessages } from "../../commom/enum/car-messages.enum";
import { DriverModuleMessages } from "../../commom/enum/driver-messages.enum";
import { handlePagination } from "../../commom/utils/query.utils";
import { convertBooleanString } from "../../commom/utils/request.utils";
import { defaultPageSize, defautlInitialPage, maximumCarsAllowed } from "../../config/constants";
import { Allocation } from "../../entity/allocation.entity";
import { Car } from "../../entity/car.entity";
import { Driver } from "../../entity/driver.entity";
import { CarService } from "../car/car.service";
import { DriverService } from "../driver/driver.service";
import { SearchAllocationRequestDTO } from "./dto/search-allocations.dto";


@Injectable()
export class AllocationService {

    private maximumCarsPerDriver = maximumCarsAllowed

    constructor(
        @InjectRepository(Allocation) private readonly allocationRepository: Repository<Allocation>,
        @Inject(CarService) private readonly carService: CarService,
        @Inject(DriverService) private readonly driverService: DriverService,

    ) { }

    /**
     * Allocate a car to a driver following the rules for allocation 
     * ( N(maximumCarsPerDriver) cars per driver, 1 driver per car)
     * @param carId 
     * @param driverId 
     * @param reason 
     */
    async allocateCar(carId: number, driverId: number, reason: string): Promise<Allocation> {
        let car: Car
        let driver: Driver

        car = await this.carService.get(carId, true)
        driver = await this.driverService.get(driverId, true)

        const carIsAvailable = await this.checkCarAvailability(carId)

        if (!carIsAvailable) {
            throw new BadRequestException(CarMessages.carIsAlreadyInUse)
        }

        const driverAllocatedCars = await this.checkDriverAllocatedCars(driverId)

        if (driverAllocatedCars >= this.maximumCarsPerDriver) {
            throw new BadRequestException(DriverModuleMessages.cantAllocateMoreCarsToDriver)
        }


        return this
            .allocationRepository.save({ carId, driverId, allocationReason: reason })
            .then(allocation => {
                allocation.driver = driver
                allocation.car = car

                return allocation
            })
    }

    /**
     * Return true if the car is being used by any driver
     * @param carId The given car id
     */
    async checkCarAvailability(carId: number) {
        return !Boolean(await this.allocationRepository.count({
            where: {
                carId,
                endDate: 'IS NULL'
            }
        }))
    }

    /**
     * Return the number of currently allocated cars a giver driver has
     * @param driverId 
     */
    async checkDriverAllocatedCars(driverId: number): Promise<number> {

        return this.allocationRepository.count({
            where: {
                driverId,
                endDate: IsNull()
            }
        })
    }

    /**
     * Returns a list of allocations using the given filters
     * @param data 
     */
    async search(data: SearchAllocationRequestDTO): Promise<GenericSerchReturnDTO<Allocation>> {
        const {
            activeOnly,
            carId,
            driverId,
            page = defautlInitialPage,
            pageSize = defaultPageSize
        } = data


        console.log('data', data);

        const where: FindConditions<Allocation> = {}
        console.log('asdsad', typeof activeOnly);

        if (typeof activeOnly !== 'undefined') {
            where.endDate = convertBooleanString(activeOnly) ? IsNull() : Not(IsNull())
        }


        if (driverId) {
            where.driverId = parseInt(driverId.toString())
        }

        if (carId) {
            where.carId = parseInt(carId.toString())
        }

        const { skip, take } = handlePagination(page, pageSize)
        const [list, totalResults] = await this.allocationRepository.findAndCount({
            where,
            skip,
            take,
            relations: ['car', 'driver']
        })
        console.log('where', where);

        return {
            list,
            totalResults,
        }
    }

    /**
     * FInalize an allocation
     * @param allocationId 
     */
    async finalizeAllocation(allocationId: number): Promise<void> {

        const affected = (await this.allocationRepository.update(allocationId, { endDate: new Date() })).affected

        if (!affected) {
            throw new NotFoundException(AllocationMessages.allocationNotFound)
        }
    }

}