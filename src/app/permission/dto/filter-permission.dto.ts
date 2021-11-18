
import { ApiProperty } from "@nestjs/swagger";
import { BaseFilterDto } from "@src/core/common/dtos/filter-many";
import { IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class FilterPermissionDto extends BaseFilterDto {
  @ApiProperty({ example: "create|read|update|delete|manage", required: false })
  @IsString()
  @IsOptional()
  action: string;

  @ApiProperty({ example: "uuid", required: false })
  @IsString()
  @IsOptional()
  objectId: string;

  @ApiProperty({ example: "JSON Object", required: false })
  @IsOptional()
  condition: string;
}