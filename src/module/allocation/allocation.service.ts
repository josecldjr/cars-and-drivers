import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNull, Repository } from "typeorm";
import { CarMessages } from "../../commom/enum/car-messages.enum";
import { DriverModuleMessages } from "../../commom/enum/driver-messages.enum";
import { maximumCarsAllowed } from "../../config/constants";
import { Allocation } from "../../entity/allocation.entity";
import { Car } from "../../entity/car.entity";
import { Driver } from "../../entity/driver.entity";
import { CarService } from "../car/car.service";
import { DriverService } from "../driver/driver.service";


@Injectable()
export class AllocationService {

    private maximumCarsPerDriver = maximumCarsAllowed

    constructor(
        @InjectRepository(Allocation) private readonly allocationRepository: Repository<Allocation>,
        @Inject(CarService) private readonly carService: CarService,
        @Inject(DriverService) private readonly driverService: DriverService,

    ) { }

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
                endDate: IsNull()
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
                driverId
            }
        })
    }

}