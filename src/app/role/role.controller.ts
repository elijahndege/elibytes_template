import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiOperation } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';
import { Role } from './entities/role.entity';
import { FilterRoleDto } from './dto/filter-role.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }


  @ApiOperation({ summary: "Create a role" })
  @Post()
  // @IsAuth()
  createOne(@Body() dto: CreateRoleDto): Promise<Role> {
    return this.roleService.createOne(dto);
  }

  @ApiOperation({ summary: "Get many roles" })
  @Get()
  // @IsAuth()
  findMany(@Query() param: FilterRoleDto) {
    return this.roleService.findMany(param);
  }

  @ApiOperation({ summary: "Get a role" })
  @Get(":id")
  // @IsAuth()
  getOne(@Param("id", ParseIntPipe) id: number): Promise<Role> {
    return this.roleService.findOneOrFail(id);
  }

  @ApiOperation({ summary: "Update a role" })
  @Patch(":id")
  // @IsAuth()
  updateOne(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateRoleDto,
  ): Promise<Role> {
    return this.roleService.updateOne(id, dto);
  }

  @ApiOperation({ summary: "Delete a role" })
  @Delete(":id")
  // @IsAuth()
  deleteOne(@Param("id", ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.roleService.deleteOne(id);
  }
}
