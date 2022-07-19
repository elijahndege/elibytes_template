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
import { CreateSubjectDto } from './dto/create-subject.dto';
import { FilterSubjectDto } from './dto/filter-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { AppSubject } from './entities/subject.entity';
import { AppSubjectService } from './subject.service';

@Controller('subject')
export class ObjectController {
  constructor(private readonly subjectService: AppSubjectService) {}

  @ApiOperation({ summary: 'Create a subjects' })
  @Post()
  createOne(@Body() dto: CreateSubjectDto): Promise<AppSubject> {
    return this.subjectService.createOne(dto);
  }

  @ApiOperation({ summary: 'Get many subjects' })
  @Get()
  findMany(@Query() param: FilterSubjectDto) {
    return this.subjectService.findMany(param);
  }

  @ApiOperation({ summary: 'Get a subject' })
  @Get(':id')
  getOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<AppSubject> {
    return this.subjectService.findOneOrFail({ where: { id } });
  }

  @ApiOperation({ summary: 'Update a subject' })
  @Patch(':id')
  updateOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdateSubjectDto,
  ): Promise<AppSubject> {
    return this.subjectService.updateOne({ where: { id } }, dto);
  }

  @ApiOperation({ summary: 'Delete a subject' })
  @Delete(':id')
  deleteOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<DeleteResult> {
    return this.subjectService.deleteOne(id);
  }
}
