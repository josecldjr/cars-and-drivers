import { IsNumberString, IsOptional, Length } from "class-validator";

export class SearchDriversDTO {

    @IsOptional()
    @Length(1, 50)
    searchText?: string | undefined

    @IsOptional()
    @IsNumberString()
    page?: number | string

    @IsOptional()
    @IsNumberString()
    pageSize?: number | string
}
