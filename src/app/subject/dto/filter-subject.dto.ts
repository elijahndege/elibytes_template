
import { ApiProperty } from "@nestjs/swagger";
import { BaseFilterDto } from "@src/core/common/dtos/filter-many";
import { IsEmpty, IsString } from "class-validator";

export class FilterSubjectDto extends BaseFilterDto {
  @ApiProperty({ example: "User|Role|Permission", nullable: false })
  @IsString()
  @IsEmpty()
  name: string;
}