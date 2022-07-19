import { CreateUserDto } from '@App/user/dto/create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto extends CreateUserDto {}

export class LoginDto {
  @ApiProperty({ example: 'example@gmail.com', nullable: false })
  @MinLength(5)
  @MaxLength(50)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'abcde1234@#', nullable: false })
  @MinLength(5)
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  password: string;
}
