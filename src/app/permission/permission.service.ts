import { Injectable } from '@nestjs/common';
import { CrudService } from '@src/core/abstracts/base-service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';
import { PermissionRepository } from './repositories/permission.repository';

@Injectable()
export class PermissionService  extends CrudService<Permission>{
  constructor(private readonly permissionRepository: PermissionRepository){
  super(permissionRepository)
  }

}
