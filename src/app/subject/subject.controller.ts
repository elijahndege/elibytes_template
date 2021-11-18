import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { AppSubjectService } from './subject.service';
import { ApiOperation } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { FilterSubjectDto } from './dto/filter-subject.dto';
import { AppSubject } from './entities/subject.entity';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Controller('object')
export class ObjectController {
  constructor(private readonly subjectService: AppSubjectService) { }
  
  @ApiOperation({ summary: "Create a subjects" })
  @Post()
  // @IsAuth()
  createOne(@Body() dto: CreateSubjectDto): Promise<AppSubject> {
    return this.subjectService.createOne(dto);
  }

  @ApiOperation({ summary: "Get many subjects" })
  @Get()
  // @IsAuth()
  findMany(@Query() param: FilterSubjectDto) {
    return this.subjectService.findMany(param);
  }

  @ApiOperation({ summary: "Get a subject" })
  @Get(":id")
  // @IsAuth()
  getOne(@Param("id", ParseIntPipe) id: number): Promise<AppSubject> {
    return this.subjectService.findOneOrFail(id);
  }

  @ApiOperation({ summary: "Update a subject" })
  @Patch(":id")
  // @IsAuth()
  updateOne(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateSubjectDto,
  ): Promise<AppSubject> {
    return this.subjectService.updateOne(id, dto);
  }

  @ApiOperation({ summary: "Delete a subject" })
  @Delete(":id")
  // @IsAuth()
  deleteOne(@Param("id", ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.subjectService.deleteOne(id);
  }
}
