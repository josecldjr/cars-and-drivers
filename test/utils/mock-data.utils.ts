import { Driver } from "../../src/entity/driver.entity"

export async function getMockDriver(): Promise<Driver> {
    const driver = new Driver()

    driver.id = 1
    driver.createdAt = new Date
    driver.updatedAt = new Date
    driver.name = 'bla bla bla'
    driver.active = true

    return driver
} 
