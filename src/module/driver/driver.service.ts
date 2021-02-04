import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindConditions, Like, Repository } from "typeorm";
import { GenericSerchReturnDTO } from "../../commom/dto/generic-search.dto";
import { handlePagination } from "../../commom/utils/query.utils";
import { defaultPageSize, defautlInitialPage } from "../../config/constants";
import { Driver } from "../../entity/driver.entity";
import { SaveDriverDTO } from "./dto/save-drive.dto";
import { SearchDriversDTO } from "./dto/search-drivers.dto";
import { DriverModuleMessages } from "./messages.enum";

/**
 * Handl operations related to Drivers
 */
@Injectable()
export class DriverService {

    constructor(
        @InjectRepository(Driver) private readonly driverRepository: Repository<Driver>,
    ) { }

    /**
     * Create or update a driver
     * @param driverData 
     * @param driverId driver id ( only for update)
     */
    async save(driverData: SaveDriverDTO, driverId?: number): Promise<Driver> {
        let newDriver = new Driver()

        // only when update
        if (driverId) {
            newDriver = await this.get(driverId)

            if (!newDriver) {
                throw new NotFoundException(DriverModuleMessages.driverNotFound)
            }
        }

        newDriver.name = driverData.name

        return this.driverRepository.save(newDriver)
    }

    /**
     * Return a single driver by its Id
     * @param driverId 
     * @param allowErrorThrow thron a exception instead of returning undefined
     */
    async get(driverId: number, allowErrorThrow = false): Promise<Driver | undefined> {
        const driver = await this.driverRepository.findOne(driverId)

        if (!driver && allowErrorThrow) {
            throw new NotFoundException(DriverModuleMessages.driverNotFound)
        }

        return driver

    }

    /**
     * Return a list of Drivers 
     * @param filters 
     */
    async search(filters: SearchDriversDTO): Promise<GenericSerchReturnDTO<Driver>> {
        const {
            page = defautlInitialPage,
            pageSize = defaultPageSize,
            searchText,
        } = filters

        const where: FindConditions<Driver> = {}

        if (searchText) {
            where.name = Like(`%${searchText}%`)
        }

        const { skip, take } = handlePagination(page, pageSize)

        const [list, totalResults] = await this.driverRepository.findAndCount({
            where,
            order: { name: 'ASC' },
            skip,
            take,
        })

        return {
            list,
            totalResults,
        }
    }

    /**
     * Delete a driver (logical exclusion)
     * @param driverId 
     */
    async delete(driverId: number): Promise<void> {
        await this.driverRepository.softDelete(driverId)
    }
}
