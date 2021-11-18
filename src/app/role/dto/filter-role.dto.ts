
import { ApiProperty } from "@nestjs/swagger";
import { BaseFilterDto } from "@src/core/common/dtos/filter-many";
import { IsOptional, IsString, MaxLength } from "class-validator";

export class FilterRoleDto extends BaseFilterDto {
  @ApiProperty({ example: "Admin", required: true })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ example: "some description ", required: false })
  @IsString()
  @IsOptional()
  description: string;
}