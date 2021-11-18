import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsUUID, IsOptional, MaxLength } from "class-validator";

export class CreateSubjectDto {
    @ApiProperty({ example: "User|Role|Permission", nullable: false })
    @IsString()
    @IsNotEmpty()
    name: string;
}
