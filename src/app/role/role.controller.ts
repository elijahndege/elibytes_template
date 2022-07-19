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
import { CreateRoleDto } from './dto/create-role.dto';
import { FilterRoleDto } from './dto/filter-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({ summary: 'Create a role' })
  @Post()
  createOne(@Body() dto: CreateRoleDto): Promise<Role> {
    return this.roleService.createOne(dto);
  }

  @ApiOperation({ summary: 'Get many roles' })
  @Get()
  findMany(@Query() param: FilterRoleDto) {
    return this.roleService.findMany(param);
  }

  @ApiOperation({ summary: 'Get a role' })
  @Get(':id')
  getOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Role> {
    return this.roleService.findOneOrFail({ where: { id } });
  }

  @ApiOperation({ summary: 'Update a role' })
  @Patch(':id')
  updateOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdateRoleDto,
  ): Promise<Role> {
    return this.roleService.updateOne({ where: { id } }, dto);
  }

  @ApiOperation({ summary: 'Delete a role' })
  @Delete(':id')
  deleteOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<DeleteResult> {
    return this.roleService.deleteOne(id);
  }
}
