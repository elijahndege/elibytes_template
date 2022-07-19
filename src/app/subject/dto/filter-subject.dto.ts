import { BaseFilterDto } from '@Core/common/dtos/filter-many';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsString } from 'class-validator';

export class FilterSubjectDto extends BaseFilterDto {
  @ApiProperty({ example: 'User|Role|Permission', nullable: false })
  @IsString()
  @IsEmpty()
  name: string;
}
