import { Injectable } from '@nestjs/common';
import { CrudService } from '@src/core/abstracts/base-service';
import { Role } from './entities/role.entity';
import { RoleRepository } from './repositories/role.repository';

@Injectable()
export class RoleService extends CrudService<Role>{
  constructor(
    private roleRepository: RoleRepository,
  ) {
    super(roleRepository);
  }
}
