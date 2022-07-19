import { CrudRepository } from '@Core/abstracts/base-repo';
import { CustomRepository } from '@Core/common/decorators/typeorm-ex.decorator';
import { Permission } from '../entities/permission.entity';

@CustomRepository(Permission)
export class PermissionRepository extends CrudRepository<Permission> {}
