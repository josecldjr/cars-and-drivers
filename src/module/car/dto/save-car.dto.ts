import { Length } from "class-validator"

export class SaveCarResquestDTO {

    @Length(7, 8)
    licencePlate: string

    @Length(3, 20)
    color: string

    @Length(3, 30)
    brand: string

}
