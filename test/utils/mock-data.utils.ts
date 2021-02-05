import { Car } from "../../src/entity/car.entity"
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

export async function getMockCar() {
    const car = new Car()

    car.id = 1
    car.active = true
    car.brand = 'Ford Ka'
    car.color = 'Red'
    car.createdAt = new Date()
    car.updatedAt = new Date()
    car.deletedAt = null
    car.licencePlate = 'SDA5218'

    return car
}
