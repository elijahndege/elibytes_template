import { BaseFilterDto } from '@Core/common/dtos/filter-many';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FilterPermissionDto extends BaseFilterDto {
  @ApiProperty({ example: 'create|read|update|delete|manage', required: false })
  @IsString()
  @IsOptional()
  action: string;

  @ApiProperty({ example: 'uuid', required: false })
  @IsString()
  @IsOptional()
  objectId: string;

  @ApiProperty({ example: 'JSON Object', required: false })
  @IsOptional()
  condition: string;
}
