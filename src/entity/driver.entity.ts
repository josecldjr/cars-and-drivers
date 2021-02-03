import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Driver {

    @PrimaryGeneratedColumn('increment')
    id: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string

    @Column({ type: 'boolean', default: true })
    active: boolean
}