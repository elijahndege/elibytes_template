import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(public userService: UserService) {}

  @ApiOperation({ summary: 'Create a user' })
  @Post()
  // @IsAuth()
  createOne(@Body() dto: CreateUserDto): Promise<User> {
    return this.userService.createOne(dto);
  }

  // @ApiOperation({ summary: "Get many users" })
  // @Get()
  // // @IsAuth()
  // findMany(@Query() param: FilterUserDTO) {
  //   return this.service.findMany(param);
  // }

  // @ApiOperation({ summary: "Get a user" })
  // @Get(":id")
  // // @IsAuth()
  // getOne(@Param("id",  new ParseUUIDPipe({ version: '4' })) id: number): Promise<User> {
  //   return this.service.findOneOrFail(id);
  // }

  // @ApiOperation({ summary: "Update a user" })
  // @Patch(":id")
  // @IsAuth()
  // updateOne(
  //   @Param("id",  new ParseUUIDPipe({ version: '4' })) id: number,
  //   @Body() dto: UpdateUserDTO,
  // ): Promise<User> {
  //   return this.service.updateOne(id, dto);
  // }

  // @ApiOperation({ summary: "Delete a user" })
  // @Delete(":id")
  // @IsAuth()
  // deleteOne(@Param("id",  new ParseUUIDPipe({ version: '4' })) id: number): Promise<DeleteResult> {
  //   return this.service.deleteOne(id);
  // }
}
