import { IsOptional, IsNumberString } from "class-validator"

export type GenericSerchReturnDTO<T> = {
    list: T[]
    totalResults: number
}

export class GenericSearchRequestDRO {

    @IsOptional()
    @IsNumberString()
    page?: number | string

    @IsOptional()
    @IsNumberString()
    pageSize?: number | string
}