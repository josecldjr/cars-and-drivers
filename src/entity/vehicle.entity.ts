import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

/**
 * Vehicle Entity
 */
@Entity()
export class Vehicle {

    @PrimaryGeneratedColumn('increment')
    id: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date

    @Column({ type: 'varchar', length: 20, nullable: false })
    licencePlate: string

    @Column({ type: 'varchar', length: 20 })
    color: string

    @Column({ type: 'varchar', length: 20 })
    brand: string

    @Column({ type: 'boolean', default: true })
    active: boolean

}