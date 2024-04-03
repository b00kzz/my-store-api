import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    uuid: string
}