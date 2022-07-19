import { CrudRepository } from '@Core/abstracts/base-repo';
import { CustomRepository } from '@Core/common/decorators/typeorm-ex.decorator';
import { LocalLogin } from '../entities/local-login.entity';

@CustomRepository(LocalLogin)
export class LocalLoginRepository extends CrudRepository<LocalLogin> {}
