import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';
import { ApiOperation } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { FilterPermissionDto } from './dto/filter-permission.dto';
import { CreatePermissionDto } from './dto/create-permission.dto';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @ApiOperation({ summary: "Create a permission" })
  @Post()
  // @IsAuth()
  createOne(@Body() dto: CreatePermissionDto): Promise<Permission> {
    return this.permissionService.createOne(dto);
  }

  @ApiOperation({ summary: "Get many Permissions" })
  @Get()
  // @IsAuth()
  findMany(@Query() param: FilterPermissionDto) {
    return this.permissionService.findMany(param);
  }

  @ApiOperation({ summary: "Get a permission" })
  @Get(":id")
  // @IsAuth()
  getOne(@Param("id", ParseIntPipe) id: number): Promise<Permission> {
    return this.permissionService.findOneOrFail(id);
  }

  @ApiOperation({ summary: "Update a role" })
  @Patch(":id")
  // @IsAuth()
  updateOne(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdatePermissionDto,
  ): Promise<Permission> {
    return this.permissionService.updateOne(id, dto);
  }

  @ApiOperation({ summary: "Delete a Permission" })
  @Delete(":id")
  // @IsAuth()
  deleteOne(@Param("id", ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.permissionService.deleteOne(id);
  }
}
