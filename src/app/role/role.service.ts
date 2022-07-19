import { CrudService } from '@Core/abstracts/base-service';
import { Injectable } from '@nestjs/common';
import { Role } from './entities/role.entity';
import { RoleRepository } from './repositories/role.repository';

@Injectable()
export class RoleService extends CrudService<Role> {
  constructor(private roleRepository: RoleRepository) {
    super(roleRepository);
  }
}
