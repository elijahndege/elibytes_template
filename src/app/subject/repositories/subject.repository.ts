import { CrudRepository } from '@Core/abstracts/base-repo';
import { CustomRepository } from '@Core/common/decorators/typeorm-ex.decorator';
import { AppSubject } from '../entities/subject.entity';

@CustomRepository(AppSubject)
export class AppSubjectRepository extends CrudRepository<AppSubject> {}
