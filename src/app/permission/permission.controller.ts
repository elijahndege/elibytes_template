import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { FilterPermissionDto } from './dto/filter-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';
import { PermissionService } from './permission.service';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @ApiOperation({ summary: 'Create a permission' })
  @Post()
  createOne(@Body() dto: CreatePermissionDto): Promise<Permission> {
    return this.permissionService.createOne(dto);
  }

  @ApiOperation({ summary: 'Get many Permissions' })
  @Get()
  findMany(@Query() param: FilterPermissionDto) {
    return this.permissionService.findMany(param);
  }

  @ApiOperation({ summary: 'Get a permission' })
  @Get(':id')
  getOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Permission> {
    return this.permissionService.findOneOrFail({ where: { id } });
  }

  @ApiOperation({ summary: 'Update a role' })
  @Patch(':id')
  updateOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdatePermissionDto,
  ): Promise<Permission> {
    return this.permissionService.updateOne({ where: { id } }, dto);
  }

  @ApiOperation({ summary: 'Delete a Permission' })
  @Delete(':id')
  deleteOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<DeleteResult> {
    return this.permissionService.deleteOne(id);
  }
}
