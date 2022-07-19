import { ApiProperty } from '@nestjs/swagger';
import {
  MinLength,
  MaxLength,
  IsString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'Admin', nullable: false })
  @MinLength(5)
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Some dummy text', nullable: true })
  @MinLength(5)
  @MaxLength(50)
  @IsString()
  @IsOptional()
  description: string;
}
