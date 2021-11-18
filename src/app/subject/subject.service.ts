import { Injectable } from '@nestjs/common';
import { CrudService } from '@src/core/abstracts/base-service';
import { AppSubject } from './entities/subject.entity';
import { AppSubjectRepository } from './repositories/subject.repository';

@Injectable()
export class AppSubjectService extends CrudService<AppSubject>{
constructor(private readonly appSubjectRepository: AppSubjectRepository){
  super(appSubjectRepository);
}

}
