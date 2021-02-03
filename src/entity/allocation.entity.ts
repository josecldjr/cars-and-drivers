import { CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Driver } from "./driver.entity"
import { Vehicle } from "./vehicle.entity"


/**
 * Allocation entity
 */
@Entity()
export class Allocation {

    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    createdAt: Date
    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date

    @ManyToOne(() => Vehicle, { nullable: false })
    vehicle: Vehicle

    @JoinColumn()
    vehicleId: number

    @ManyToOne(() => Driver, { nullable: false })
    driver: Driver

    @JoinColumn()
    driverId: number

}