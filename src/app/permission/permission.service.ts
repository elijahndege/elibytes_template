import { CrudService } from '@Core/abstracts/base-service';
import { Injectable } from '@nestjs/common';
import { Permission } from './entities/permission.entity';
import { PermissionRepository } from './repositories/permission.repository';

@Injectable()
export class PermissionService extends CrudService<Permission> {
  constructor(private readonly permissionRepository: PermissionRepository) {
    super(permissionRepository);
  }
}
