import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Driver } from "./driver.entity"
import { Car } from "./car.entity"

/**
 * Allocation entity | Used to represent when a driver get a car
 */
@Entity()
export class Allocation {

    @PrimaryGeneratedColumn()
    id: number

    @DeleteDateColumn()
    deletedAt: Date

    @CreateDateColumn()
    startDate: Date

    @Column({ type: 'datetime', default: null })
    endDate: Date

    @Column()
    carId: number
    @ManyToOne(() => Car, { nullable: false })
    car: Car

    @Column()
    driverId: number
    @ManyToOne(() => Driver, { nullable: false })
    driver: Driver

    @Column({ type: 'varchar', length: 1000, nullable: false })
    allocationReason: string
}
