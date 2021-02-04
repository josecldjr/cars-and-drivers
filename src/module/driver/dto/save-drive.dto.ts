import { Length } from "class-validator";

export class SaveDriverDTO {

    @Length(4, 255)
    name: string

}
