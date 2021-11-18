import { Module } from '@nestjs/common';
import { AppSubjectService } from './subject.service';
import { ObjectController } from './subject.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppSubjectRepository } from './repositories/subject.repository';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      AppSubjectRepository
    ])
  ],
  controllers: [ObjectController],
  providers: [AppSubjectService]
})
export class ObjectModule {}
