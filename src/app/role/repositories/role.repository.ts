import { CrudRepository } from '@Core/abstracts/base-repo';
import { CustomRepository } from '@Core/common/decorators/typeorm-ex.decorator';
import { Role } from '../entities/role.entity';

@CustomRepository(Role)
export class RoleRepository extends CrudRepository<Role> {}
