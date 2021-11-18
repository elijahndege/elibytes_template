import { ApiProperty } from "@nestjs/swagger";
import { MaxLength, IsString, IsNotEmpty, IsOptional, IsNumber, IsUUID } from "class-validator";


export class CreatePermissionDto {
    @ApiProperty({ example: "create|read|update|delete|manage", nullable: false })
    @IsString()
    @IsNotEmpty()
    action: string;

    @ApiProperty({ example: "1", nullable: true })
    @IsUUID('4')
    @IsOptional()
    objectId: string;

    @ApiProperty({ example: "Json Object", nullable: true })
    @MaxLength(20, {
        each: true,
    })
    @IsOptional()
    condition: string[]
}
