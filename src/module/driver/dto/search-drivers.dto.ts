import { IsOptional, Length } from "class-validator";
import { GenericSearchRequestDRO } from "../../../commom/dto/generic-search.dto";

export class SearchDriversDTO extends GenericSearchRequestDRO {

    @IsOptional()
    @Length(1, 50)
    searchText?: string | undefined

}
