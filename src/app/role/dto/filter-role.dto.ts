import { BaseFilterDto } from '@Core/common/dtos/filter-many';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FilterRoleDto extends BaseFilterDto {
  @ApiProperty({ example: 'Admin', required: true })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ example: 'some description ', required: false })
  @IsString()
  @IsOptional()
  description: string;
}
