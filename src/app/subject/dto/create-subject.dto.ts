import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubjectDto {
  @ApiProperty({ example: 'User|Role|Permission', nullable: false })
  @IsString()
  @IsNotEmpty()
  name: string;
}
