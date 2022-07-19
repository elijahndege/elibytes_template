import { BaseFilterDto } from '@Core/common/dtos/filter-many';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class FilterUserDto extends BaseFilterDto {
  @ApiProperty({ example: 'example@gmail.com', required: false })
  @MaxLength(500)
  @IsString()
  @IsOptional()
  email: string;

  @ApiProperty({ example: 'Elijah ', required: false })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  firstname: string;

  @ApiProperty({ example: 'Ndege', required: false })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  lastname: string;
}
