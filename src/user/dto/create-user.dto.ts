import { IsPhoneNumber, IsString } from "class-validator"

export class CreateUserDto {
    @IsString()
    username: string

    @IsString()
    password: string

    @IsString()
    nickName: string

    @IsString()
    avatar: string

    @IsString()
    uuid?: string

    @IsString()
    phone: string;
}
