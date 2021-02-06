import { IsNumber, Length } from "class-validator"


export class AllocateCarRequestDTO {

    @IsNumber()
    carId: number

    @IsNumber()
    driverId: number

    @Length(3, 1000)
    observation: string
}
