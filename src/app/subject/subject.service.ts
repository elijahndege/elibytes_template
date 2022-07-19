import { CrudService } from '@Core/abstracts/base-service';
import { Injectable } from '@nestjs/common';
import { AppSubject } from './entities/subject.entity';
import { AppSubjectRepository } from './repositories/subject.repository';

@Injectable()
export class AppSubjectService extends CrudService<AppSubject> {
  constructor(private readonly appSubjectRepository: AppSubjectRepository) {
    super(appSubjectRepository);
  }
}
