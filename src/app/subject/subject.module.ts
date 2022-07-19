import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '@Providers/typeorm/typeorm-ex.module';
import { AppSubjectRepository } from './repositories/subject.repository';
import { ObjectController } from './subject.controller';
import { AppSubjectService } from './subject.service';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([AppSubjectRepository])],
  controllers: [ObjectController],
  providers: [AppSubjectService],
})
export class ObjectModule {}
