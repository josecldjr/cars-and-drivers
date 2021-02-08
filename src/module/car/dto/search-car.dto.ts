import { IsNumberString, IsOptional, Length } from "class-validator"
import { GenericSearchRequestDRO } from "../../../commom/dto/generic-search.dto"

export class SearchCarRequestDTO extends GenericSearchRequestDRO {

    @IsOptional()
    @Length(1, 20)
    brand?: string

    @IsOptional()
    @Length(1, 20)
    color?: string

    @IsOptional()
    @Length(1, 20)
    licencePlate?: string


}
