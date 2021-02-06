import { IsBooleanString, IsNumberString, IsOptional, Length } from "class-validator";
import { GenericSearchRequestDRO } from "../../../commom/dto/generic-search.dto";

export class SearchAllocationRequestDTO extends GenericSearchRequestDRO {

    @IsOptional()
    @IsBooleanString()
    activeOnly?: boolean

    @IsOptional()
    @IsNumberString()
    driverId?: number | string

    @IsOptional()
    @IsNumberString()
    carId?: number | string
}
